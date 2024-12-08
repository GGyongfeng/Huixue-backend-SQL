-- 1. 插入 staff 数据
INSERT INTO staff (username, password, role, city) VALUES
-- 管理员账号
('admin', 'imguyongfeng', 'admin', '天津'),

-- 经理账号
('manager01', 'password123', 'manager', '天津'),
('manager02', 'password123', 'manager', '天津'),

-- 普通员工账号
('staff01', 'password123', 'staff', '天津'),
('staff02', 'password123', 'staff', '天津'),
('guyongfeng', '654321', 'staff', '天津'),

-- 游客账号
('visitor01', 'password123', 'visitor', '天津'),
('visitor02', 'password123', 'visitor', '天津');

-- 2. 插入 staff_info 数据
INSERT INTO staff_info (id, real_name, mobile, gender) VALUES
(1, '张管理', '13800138001', '男'),
(2, '李老师', '13800138002', '女'),
(3, '王员工', '13800138003', '男');

-- 3. 插入 teachers 数据
INSERT INTO teachers (school, grade, major, name, gender, subjects, personal_info, teaching_experience) VALUES
('天津大学', '大四', '计算机科学', '张三', '男', '数学,物理,化学', '985在校生，善于沟通', '一年家教经验'),
('南开大学', '研一', '英语教育', '李四', '女', '英语,语文', '英语专业功底扎实', '两年家教经验'),
('天津师范大学', '大三', '物理学', '王五', '男', '物理,数学', '理科学霸', '一年家教经验');
