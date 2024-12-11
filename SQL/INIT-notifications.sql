-- 删除已存在的通知表
DROP TABLE IF EXISTS notifications;

-- 创建通知表
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL COMMENT '通知标题',
    description TEXT NOT NULL COMMENT '通知内容',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by INT COMMENT '创建人ID',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    updated_by INT COMMENT '更新人ID',
    is_deleted BOOLEAN DEFAULT FALSE COMMENT '是否删除',
    deleted_at TIMESTAMP NULL COMMENT '删除时间',
    deleted_by INT COMMENT '删除人ID',
    FOREIGN KEY (created_by) REFERENCES staff(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES staff(id) ON DELETE SET NULL,
    FOREIGN KEY (deleted_by) REFERENCES staff(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统通知';

-- 创建索引
CREATE INDEX idx_notification_created_at ON notifications(created_at); 