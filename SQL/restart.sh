#!/bin/bash

# 设置 MySQL 连接信息
MYSQL_USER="root"
MYSQL_PASSWORD="Huixue@6688"

echo "开始执行 SQL 文件..."

# 检查文件是否存在
for file in INIT.sql INSERT.sql "INSERT-orders.sql" InitMeanlist.sql "INIT-notifications.sql" "INSERT-notifications.sql"; do
    if [ ! -f "$file" ]; then
        echo "错误: $file 文件不存在!"
        exit 1
    fi
done

# 执行 SQL 文件
echo "1. 执行 INIT.sql (创建数据库和表)..."
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD < INIT.sql

echo "2. 执行 INSERT.sql (插入基础数据)..."
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD education_system < INSERT.sql

echo "3. 执行 INSERT-orders.sql (插入订单数据)..."
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD education_system < INSERT-orders.sql

echo "4. 执行 InitMeanlist.sql (初始化菜单数据)..."
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD education_system < InitMeanlist.sql

echo "5. 执行 INIT-notifications.sql (创建通知表)..."
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD education_system < INIT-notifications.sql

echo "6. 执行 INSERT-notifications.sql (插入通知数据)..."
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD education_system < INSERT-notifications.sql

echo "SQL 文件执行完成！" 