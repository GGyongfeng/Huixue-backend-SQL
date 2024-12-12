const db = require('../data/dbManager');

const staffModel = {
    async findByUsername(username) {
        const cityCodes = ['tj', 'bj', 'sh', 'xa', 'nj', 'wh'];
        
        console.log('正在所有数据库中查找用户:', username);
        
        // 如果用户名以城市代码开头，优先查找对应的数据库
        const cityPrefix = username.split('_')[0];
        if (cityCodes.includes(cityPrefix)) {
            try {
                const sql = `
                    SELECT id, username, password, role, city
                    FROM staff 
                    WHERE username = ? AND is_deleted = FALSE
                    LIMIT 1
                `;
                
                console.log(`优先在 ${cityPrefix} 数据库中查找...`);
                const rows = await db.query(cityPrefix, sql, [username]);
                
                if (rows && rows[0]) {
                    console.log(`在 ${cityPrefix} 数据库中找到用户`);
                    return rows[0];
                }
            } catch (error) {
                console.error(`在 ${cityPrefix} 数据库查询时出错:`, error);
            }
        }

        // 如果没有找到，再遍历其他数据库
        for (const cityCode of cityCodes) {
            // 跳过已经查询过的数据库
            if (cityCode === cityPrefix) continue;

            try {
                const sql = `
                    SELECT id, username, password, role, city
                    FROM staff 
                    WHERE username = ? AND is_deleted = FALSE
                    LIMIT 1
                `;
                
                console.log(`正在 ${cityCode} 数据库中查找...`);
                const rows = await db.query(cityCode, sql, [username]);
                
                if (rows && rows[0]) {
                    console.log(`在 ${cityCode} 数据库中找到用户`);
                    return rows[0];
                }
            } catch (error) {
                console.error(`在 ${cityCode} 数据库查询时出错:`, error);
                continue;
            }
        }
        
        console.log('在所有数据库中都未找到用户');
        return null;
    },

    async getFullUserInfo(city, userId) {
        const sql = `
            SELECT s.*, si.*
            FROM staff s
            LEFT JOIN staff_info si ON s.id = si.id
            WHERE s.id = ? AND s.is_deleted = FALSE
            LIMIT 1
        `;
        const rows = await db.query(city, sql, [userId]);
        return rows[0] || null;
    },

    async getAllStaff(city) {
        const rows = await db.query(city, `
            SELECT s.*, si.*
            FROM staff s
            LEFT JOIN staff_info si ON s.id = si.id
            WHERE s.is_deleted = FALSE
        `);
        return rows;
    },

    // 创建新员工（需要同时插入两个表）
    async createStaff(city, staffData) {
        const connection = await db.getConnection(city);
        try {
            await connection.beginTransaction();

            // 插入 staff 表
            const [staffResult] = await connection.execute(
                'INSERT INTO staff (username, password, city) VALUES (?, ?, ?)',
                [
                    staffData.username,
                    staffData.password,
                    staffData.city || '天津'
                ]
            );

            const staffId = staffResult.insertId;

            // 插入 staff_info 表
            await connection.execute(
                'INSERT INTO staff_info (id, real_name, nick_name, email, mobile, address, gender, description, education, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    staffId,
                    staffData.real_name,
                    staffData.nike_name,
                    staffData.email,
                    staffData.mobile,
                    staffData.address,
                    staffData.sex,
                    staffData.des,
                    staffData.education,
                    staffData.avatar
                ]
            );

            await connection.commit();
            return staffId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    // 更新员工信息（需要同时更新两个表）
    async updateStaff(city, staffId, staffData) {
        const connection = await db.getConnection(city);
        try {
            await connection.beginTransaction();

            // 更新 staff 表
            await connection.execute(
                'UPDATE staff SET city = ? WHERE id = ?',
                [staffData.city, staffId]
            );

            // 更新 staff_info 表
            await connection.execute(
                `UPDATE staff_info SET 
                real_name = ?,
                nick_name = ?,
                email = ?,
                mobile = ?,
                address = ?,
                gender = ?,
                description = ?,
                education = ?,
                avatar_url = ?
                WHERE id = ?`,
                [
                    staffData.real_name,
                    staffData.nike_name,
                    staffData.email,
                    staffData.mobile,
                    staffData.address,
                    staffData.sex,
                    staffData.des,
                    staffData.education,
                    staffData.avatar,
                    staffId
                ]
            );

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    // 软删除员工
    async deleteStaff(city, staffId) {
        const connection = await db.getConnection(city);
        try {
            await connection.beginTransaction();

            await connection.execute(
                'UPDATE staff SET is_deleted = TRUE WHERE id = ?',
                [staffId]
            );

            await connection.execute(
                'UPDATE staff_info SET is_deleted = TRUE WHERE id = ?',
                [staffId]
            );

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = staffModel; 