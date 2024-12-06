const pool = require('../data/db');

const menuModel = {
    // 获取所有菜单
    async getAllMenus() {
        try {
            // 先获取所有菜单项
            const [menus] = await pool.query('SELECT * FROM menus ORDER BY id');
            // 获取所有权限
            const [auths] = await pool.query('SELECT * FROM auth_list');
            
            // 构建菜单树
            const menuTree = [];
            const menuMap = new Map();
            
            // 先把所有菜单放入 Map
            menus.forEach(menu => {
                menuMap.set(menu.id, {
                    ...menu,
                    children: [],
                    authList: []
                });
            });
            
            // 构建树形结构
            menus.forEach(menu => {
                const menuItem = menuMap.get(menu.id);
                // 添加权限列表
                menuItem.authList = auths.filter(auth => auth.menu_id === menu.id);
                
                if (menu.parent_id === null) {
                    // 顶级菜单
                    menuTree.push(menuItem);
                } else {
                    // 子菜单
                    const parentMenu = menuMap.get(menu.parent_id);
                    if (parentMenu) {
                        parentMenu.children.push(menuItem);
                    }
                }
            });
            
            return menuTree;
        } catch (error) {
            throw new Error('获取菜单列表失败：' + error.message);
        }
    }
};

module.exports = menuModel; 