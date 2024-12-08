const { pool, query } = require('../data/db');

const menuModel = {
    // 获取所有菜单
    async getAllMenus() {
        try {
            const [menus] = await pool.query('SELECT * FROM menu_list ORDER BY id');
            return this.buildMenuTree(menus);
        } catch (error) {
            throw new Error('获取菜单列表失败：' + error.message);
        }
    },

    // 根据用户角色获取菜单
    async getMenusByRole(role) {
        try {
            // 1. 获取该角色可访问的菜单ID
            const [roleMenus] = await pool.query(
                'SELECT GROUP_CONCAT(menu_id) as menuIds FROM role_menu_relation WHERE role = ?',
                [role]
            );
            
            if (!roleMenus || !roleMenus[0] || !roleMenus[0].menuIds) {
                return [];
            }
            
            // 将逗号分隔的ID字符串转换为数组
            const menuIds = roleMenus[0].menuIds.split(',').map(Number);

            // 2. 直接查询所有菜单
            const menusSQL = `SELECT * FROM menu_list WHERE id IN (${menuIds.join(',')})`;
            const rows = await query(menusSQL);
            let allMenus = [...rows];

            // 查询父菜单
            const parentIds = [...new Set(allMenus
                .map(menu => menu.parent_id)
                .filter(id => id !== null && id !== undefined))];

            if (parentIds.length > 0) {
                const parentMenusSQL = `SELECT * FROM menu_list WHERE id IN (${parentIds.join(',')})`;
                const parentMenus = await query(parentMenusSQL);
                
                if (parentMenus && parentMenus.length > 0) {
                    // 使用 Map 来去重
                    const menuMap = new Map();
                    [...allMenus, ...parentMenus].forEach(menu => {
                        menuMap.set(menu.id, menu);
                    });
                    allMenus = Array.from(menuMap.values());
                }
            }

            if (!allMenus || allMenus.length === 0) {
                return [];
            }

            // 3. 构建树形结构
            return this.buildMenuTree(allMenus, menuIds);
        } catch (error) {
            console.error('获取菜单错误:', error);
            throw new Error('获取角色菜单失败：' + error.message);
        }
    },

    buildMenuTree(menus, allowedIds) {
        if (!menus || !Array.isArray(menus) || menus.length === 0) return [];
        
        const menuMap = new Map();
        const rootMenus = [];

        menus.forEach(menu => {
            const menuItem = {
                id: menu.id,
                title: menu.title,
                path: menu.path,
                name: menu.name,
                icon: menu.icon,
                title_en: menu.title_en,
                noMenu: menu.no_menu === 1 || menu.no_menu === true,
                parent_id: menu.parent_id,
                show_badge: menu.show_badge === 1 || menu.show_badge === true,
                show_text_badge: menu.show_text_badge,
                children: []
            };
            console.log(menuItem.icon);
            menuMap.set(menu.id, menuItem);

            if (!menu.parent_id) {
                rootMenus.push(menuItem);
            }
        });

        menus.forEach(menu => {
            if (menu.parent_id) {
                const parentMenu = menuMap.get(menu.parent_id);
                if (parentMenu) {
                    parentMenu.children.push(menuMap.get(menu.id));
                }
            }
        });

        return rootMenus.filter(menu => {
            const hasPermission = allowedIds.includes(menu.id);
            const hasPermittedChildren = menu.children.some(child => 
                allowedIds.includes(child.id)
            );
            
            // 确保只保留有权限的子菜单
            menu.children = menu.children.filter(child => 
                allowedIds.includes(child.id)
            );
            
            return hasPermission || menu.children.length > 0;
        });
    }
};

module.exports = menuModel; 