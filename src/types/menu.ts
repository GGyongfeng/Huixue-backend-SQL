// 权限项
export interface AuthItem {
    id: number;
    title: string;
    auth_mark: string;
}

// 菜单项
export interface MenuItem {
    id: number;
    title: string;
    title_en?: string;
    name?: string;
    icon?: string;
    path: string;
    children?: MenuItem[];
    authList?: AuthItem[];
    showTextBadge?: string;
    noMenu?: boolean;
}

// 菜单列表
export type MenuList = MenuItem[]; 