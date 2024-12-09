-- 删除原来的菜单列表表
DROP TABLE IF EXISTS `role_menu_relation`;
DROP TABLE IF EXISTS `menu_list`;

-- 创建菜单列表表
CREATE TABLE `menu_list` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL COMMENT '菜单标题',
  `path` VARCHAR(255) NOT NULL COMMENT '路由路径',
  `name` VARCHAR(100) DEFAULT NULL COMMENT '路由名称',
  `icon` VARCHAR(20) DEFAULT NULL COMMENT '图标编码',
  `title_en` VARCHAR(100) DEFAULT NULL COMMENT '英文标题',
  `no_menu` BOOLEAN DEFAULT FALSE COMMENT '是否在菜单中隐藏 0-显示 1-隐藏',
  `parent_id` INTEGER DEFAULT NULL COMMENT '父级菜单ID',
  `show_badge` BOOLEAN DEFAULT FALSE COMMENT '是否显示徽标 0-不显示 1-显示',
  `show_text_badge` VARCHAR(50) DEFAULT NULL COMMENT '文字徽标内容',
  `auth_list` JSON DEFAULT NULL COMMENT '权限列表',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`parent_id`) REFERENCES `menu_list`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单列表';

-- 创建索引
CREATE INDEX `idx_parent_id` ON `menu_list` (`parent_id`);
CREATE INDEX `idx_path` ON `menu_list` (`path`);

-- 插入父级菜单
INSERT INTO `menu_list` 
(id, title, title_en, name, icon, path, no_menu) 
VALUES 
(1, '监控中心', 'Dashboard', 'Dashboard', 'e721', '/dashboard', FALSE),
(2, '家教订单', 'Tutors Orders', 'Tutors', 'e7ae', '/tutors', FALSE),
(3, '用户中心', 'User manguage', 'User', 'e84f', '/user', TRUE),
(18, '结果页面', 'Result page', 'Result', 'e715', '/result', FALSE),
(17, '版本计划', 'Version Plan', 'Plan', 'e712', '/plan', FALSE);

-- 插入子菜单
INSERT INTO `menu_list` 
(id, title, title_en, path, parent_id, show_text_badge, no_menu) 
VALUES 
-- Dashboard子菜单
(101, '工作台', 'Workbench', '/dashboard/console', 1, NULL, FALSE),
(102, '分析页', 'Analysis', '/dashboard/analysis', 1, NULL, FALSE),

-- 家教订单子菜单
(201, '订单列表', 'Orders list', '/tutors/list', 2, 'Hot', FALSE),
(202, '上传订单', 'Create Order', '/tutors/create', 2, NULL, FALSE),
(203, '编辑订单', 'Edit Order', '/tutors/edit', 2, NULL, FALSE),

-- 用户中心子菜单
(301, '个人中心', 'User center', '/user/user', 3, NULL, TRUE),

-- 结果页面子菜单
(401, '成功页', 'Success page', '/result/success', 18, NULL, FALSE),
(402, '失败页', 'Fail page', '/result/fail', 18, NULL, FALSE),

-- 版本计划子菜单
(1701, '更新日志', 'Update log', '/plan/log', 17, NULL, FALSE);

-- 创建角色菜单关系表
CREATE TABLE `role_menu_relation` (
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `role` VARCHAR(50) NOT NULL COMMENT '角色',
    `menu_id` INTEGER NOT NULL COMMENT '菜单ID',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`menu_id`) REFERENCES `menu_list`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `uk_role_menu` (`role`, `menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色菜单关系表';

-- 插入角色菜单关系数据
INSERT INTO `role_menu_relation` (role, menu_id) VALUES 
-- 管理员可以访问所有菜单
-- 监控中心
('admin', 1), ('admin', 101), ('admin', 102),
-- 家教订单
('admin', 2), ('admin', 201), ('admin', 202), ('admin', 203),
-- 用户中心
('admin', 3), ('admin', 301),
-- 结果页面
('admin', 401), ('admin', 402), 
--版本计划
('admin', 17), ('admin', 1701),

-- 经理可以访问部分菜单
-- 监控中心
('manager', 1), ('manager', 101), ('manager', 102),
-- 家教订单
('manager', 2), ('manager', 201), ('manager', 202), ('manager', 203),
-- 用户中心
('manager', 3), ('manager', 301),
--版本计划
('manager', 17), ('manager', 1701),

-- 普通员工只能访问基础功能
-- 家教订单
('staff', 2), ('staff', 201), ('staff', 202), ('staff', 203),
-- 用户中心
('staff', 3), ('staff', 301),

-- 游客最小权限
('visitor', 2), ('visitor', 201); -- 只能查看订单列表

SELECT * FROM menu_list;