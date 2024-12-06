-- 创建数据库
CREATE DATABASE IF NOT EXISTS education_system DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE education_system;

-- 1. 先创建 staff 表（因为其他表都引用它）
CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resignation_time TIMESTAMP NULL,
    city VARCHAR(50) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- 2. 创建 staff_info 表（依赖 staff）
CREATE TABLE staff_info (
    id INT PRIMARY KEY,
    avatar_url VARCHAR(255) COMMENT '头像URL地址',
    real_name VARCHAR(50) NOT NULL,
    nick_name VARCHAR(50),
    email VARCHAR(100),
    mobile VARCHAR(20) NOT NULL,
    address TEXT,
    gender ENUM('男', '女') NOT NULL,
    description TEXT COMMENT '个人介绍',
    education VARCHAR(50),
    tags JSON,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id) REFERENCES staff(id) ON DELETE CASCADE
);

-- 3. 创建 teachers 表（被 tutor_orders 引用）
CREATE TABLE teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    school VARCHAR(100) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL DEFAULT '天津',
    major VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    gender ENUM('男', '女') NOT NULL,
    subjects TEXT NOT NULL COMMENT '可教科目',
    personal_info TEXT COMMENT '个人情况',
    teaching_experience TEXT COMMENT '家教经验',
    register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_count INT DEFAULT 0 COMMENT '接单次数',
    deal_count INT DEFAULT 0 COMMENT '成交次数',
    cancel_count INT DEFAULT 0 COMMENT '退单次数',
    rating INT DEFAULT 60 CHECK (rating BETWEEN 1 AND 100) COMMENT '综合评分',
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL
);


-- 4. 最后创建 tutor_orders 表（因为它依赖其他表）
CREATE TABLE tutor_orders (
    id INT PRIMARY KEY AUTO_INCREMENT ,
    -- 订单信息
    tutor_code VARCHAR(50) UNIQUE NOT NULL COMMENT '编号',
    student_gender ENUM('男', '女') NOT NULL COMMENT '学生性别',
    teaching_type ENUM('一对一', '一对多') NOT NULL COMMENT '教学类型',
    student_grade ENUM('幼儿', '小学', '初一', '初二', '初三', '高一', '高二', '高三', '其他') NOT NULL COMMENT '年级',
    subjects SET('语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治', '国际课程', '信息技术', '乐器') NOT NULL COMMENT '科目',
    teacher_type ENUM('在职老师', '985学生', '无') DEFAULT '无' COMMENT '教师水平要求',
    teacher_gender ENUM('男', '女', '无') DEFAULT '无' COMMENT '教师性别要求',
    order_tags SET('专职单子', '好单子', '加急单子', '特殊单子') NULL COMMENT '订单标签',
    district ENUM('南开区', '和平区', '河西区', '河东区', '河北区', '红桥区', '津南区', '滨海新区') NOT NULL COMMENT '所在区域',
    city VARCHAR(50) NOT NULL DEFAULT '天津' COMMENT '所在城市',
    address VARCHAR(255) NOT NULL COMMENT '详细地址',
    grade_score VARCHAR(20) NULL COMMENT '成绩',
    student_level ENUM('优秀', '较好', '中等', '不及格') NULL COMMENT '学生水平',
    tutoring_time TEXT NOT NULL COMMENT '补习时间',
    salary VARCHAR(100) NOT NULL COMMENT '薪资信息',
    requirement_desc TEXT COMMENT '需求详细描述',
    
    -- 订单管理
    is_visible BOOLEAN DEFAULT TRUE COMMENT '是否可见',
    status ENUM('已成交', '未成交') DEFAULT '未成交' COMMENT '订单状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by INT COMMENT '创建人ID',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    updated_by INT COMMENT '更新人ID',
    is_deleted BOOLEAN DEFAULT FALSE COMMENT '是否删除',
    deleted_by INT COMMENT '删除人ID',
    deleted_at TIMESTAMP NULL COMMENT '删除时间',
    order_count INT DEFAULT 0 COMMENT '接单数量',
    deal_time TIMESTAMP NULL COMMENT '成交时间',
    deal_teacher_id INT COMMENT '成交教师ID',
    deal_staff_id INT COMMENT '成交员工ID',
    FOREIGN KEY (created_by) REFERENCES staff(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES staff(id) ON DELETE SET NULL,
    FOREIGN KEY (deleted_by) REFERENCES staff(id) ON DELETE SET NULL,
    FOREIGN KEY (deal_teacher_id) REFERENCES teachers(id) ON DELETE SET NULL,
    FOREIGN KEY (deal_staff_id) REFERENCES staff(id) ON DELETE SET NULL
);

-- 6. 最后创建索引
CREATE INDEX idx_tutor_code ON tutor_orders(tutor_code);
CREATE INDEX idx_staff_username ON staff(username);
CREATE INDEX idx_user_mobile ON staff_info(mobile);
CREATE INDEX idx_staff_city ON staff(city);
CREATE INDEX idx_tutor_city ON tutor_orders(city);
CREATE INDEX idx_teacher_city ON teachers(city);
