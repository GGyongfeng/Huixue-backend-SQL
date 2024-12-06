// 引入数据库连接池
const pool = require('../data/db');

// 员工模型对象
const staffModel = {
    // 登录验证时只查询基本信息
    async findByUsername(username) {
        const sql = `
            SELECT id, username, password, city
            FROM staff 
            WHERE username = ? AND is_deleted = FALSE
            LIMIT 1
        `;
        const [rows] = await pool.query(sql, [username]);
        return rows || null;
    },

    // 获取完整的用户信息（包括个人资料）
    async getFullUserInfo(userId) {
        const sql = `
            SELECT s.*, si.*
            FROM staff s
            LEFT JOIN staff_info si ON s.id = si.id
            WHERE s.id = ? AND s.is_deleted = FALSE
            LIMIT 1
        `;
        const [rows] = await pool.query(sql, [userId]);
        return rows[0] || null;
    },

    // 获取所有员工列表
    async getAllStaff() {
        const [rows] = await pool.query(`
            SELECT s.*, si.*
            FROM staff s
            LEFT JOIN staff_info si ON s.id = si.id
            WHERE s.is_deleted = FALSE
        `);
        return rows;
    },

    // 创建新员工（需要同时插入两个表）
    async createStaff(staffData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // 插入 staff 表
            const [staffResult] = await connection.query(
                'INSERT INTO staff (username, password, city) VALUES (?, ?, ?)',
                [
                    staffData.username,
                    staffData.password,
                    staffData.city || '天津'
                ]
            );

            const staffId = staffResult.insertId;

            // 插入 staff_info 表
            await connection.query(
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
    async updateStaff(staffId, staffData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // 更新 staff 表
            await connection.query(
                'UPDATE staff SET city = ? WHERE id = ?',
                [
                    staffData.city,
                    staffId
                ]
            );

            // 更新 staff_info 表
            await connection.query(
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
    async deleteStaff(staffId) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // 软删除 staff 表记录
            await connection.query(
                'UPDATE staff SET is_deleted = TRUE WHERE id = ?',
                [staffId]
            );

            // 软删除 staff_info 表记录
            await connection.query(
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