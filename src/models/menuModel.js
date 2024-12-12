const db = require('../data/dbManager');

class MenuModel {
    static async getMenusByRole(city, role) {
        const sql = `
            SELECT m.* 
            FROM menu_list m
            INNER JOIN role_menu_relation r ON m.id = r.menu_id
            WHERE r.role = ?
            ORDER BY m.id
        `;
        const menus = await db.query(city, sql, [role]);
        return this.buildMenuTree(menus);
    }

    static async getList(city) {
        const sql = `
            SELECT * FROM menu_list
            ORDER BY id
        `;
        const menus = await db.query(city, sql);
        return this.buildMenuTree(menus);
    }

    static buildMenuTree(menus) {
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
                noMenu: menu.no_menu === 1,
                parent_id: menu.parent_id,
                show_badge: menu.show_badge === 1,
                show_text_badge: menu.show_text_badge,
                children: []
            };
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

        return rootMenus;
    }
}

module.exports = MenuModel; 