const db = require('../data/db')

class TutorNoticeModel {
    /**
     * 获取最新的一条未删除通知
     */
    static async getLatestNotice() {
        const sql = `
            SELECT 
                n.*,
                s.username as created_by_name,
                u.username as updated_by_name
            FROM notifications n
            LEFT JOIN staff s ON n.created_by = s.id
            LEFT JOIN staff u ON n.updated_by = u.id
            WHERE n.is_deleted = FALSE
            ORDER BY n.created_at DESC
            LIMIT 1
        `
        const [rows] = await db.query(sql)
        return rows
    }

    /**
     * 创建新通知
     */
    static async create(data, staffId) {
        const sql = `
            INSERT INTO notifications (
                title, description, created_by
            ) VALUES (?, ?, ?)
        `
        const values = [data.title, data.description, staffId]
        const result = await db.query(sql, values)
        return result.insertId
    }

    /**
     * 更新通知
     */
    static async update(id, data, staffId) {
        const updates = []
        const values = []

        if (data.title !== undefined) {
            updates.push('title = ?')
            values.push(data.title)
        }

        if (data.description !== undefined) {
            updates.push('description = ?')
            values.push(data.description)
        }

        if (updates.length === 0) {
            return false
        }

        updates.push('updated_by = ?')
        values.push(staffId)

        values.push(id)

        const sql = `
            UPDATE notifications 
            SET ${updates.join(', ')}
            WHERE id = ? AND is_deleted = FALSE
        `
        const result = await db.query(sql, values)
        return result.affectedRows > 0
    }

    /**
     * 删除通知
     */
    static async delete(id, staffId) {
        const sql = `
            UPDATE notifications 
            SET is_deleted = TRUE,
                deleted_by = ?,
                deleted_at = CURRENT_TIMESTAMP
            WHERE id = ? AND is_deleted = FALSE
        `
        const result = await db.query(sql, [staffId, id])
        return result.affectedRows > 0
    }

    /**
     * 根据ID获取通知详情
     */
    static async getById(id) {
        const sql = `
            SELECT 
                n.*,
                s.username as created_by_name,
                u.username as updated_by_name,
                d.username as deleted_by_name
            FROM notifications n
            LEFT JOIN staff s ON n.created_by = s.id
            LEFT JOIN staff u ON n.updated_by = u.id
            LEFT JOIN staff d ON n.deleted_by = d.id
            WHERE n.id = ? AND n.is_deleted = FALSE
        `
        const [rows] = await db.query(sql, [id])
        return rows
    }
}

module.exports = TutorNoticeModel 