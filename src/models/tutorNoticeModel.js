const db = require('../data/dbManager');

class TutorNoticeModel {
    static async getLatestNotice(city) {
        const sql = `
            SELECT id, title, description
            FROM notifications
            WHERE is_deleted = FALSE
            ORDER BY created_at DESC
            LIMIT 1
        `;
        
        try {
            const result = await db.query(city, sql);
            
            if (!Array.isArray(result) || result.length === 0) {
                return null;
            }

            const notice = result[0];
            if (!notice || !notice.title || !notice.description) {
                return null;
            }

            return notice;
        } catch (error) {
            throw error;
        }
    }

    static async getById(city, id) {
        const sql = `
            SELECT id, title, description 
            FROM notifications 
            WHERE id = ? AND is_deleted = FALSE
        `;
        
        try {
            const result = await db.query(city, sql, [id]);
            
            if (!Array.isArray(result) || result.length === 0) {
                return null;
            }
            
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(city, id, data, staffId) {
        const sql = `
            UPDATE notifications 
            SET 
                title = ?,
                description = ?,
                updated_at = NOW(),
                updated_by = ?
            WHERE id = ? AND is_deleted = FALSE
        `;
        
        try {
            if (!id) {
                return await this.create(city, data, staffId);
            }
            
            const result = await db.query(city, sql, [
                data.title,
                data.description,
                staffId,
                id
            ]);
            return result && result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async create(city, data, staffId) {
        const sql = `
            INSERT INTO notifications (
                title,
                description,
                created_by,
                created_at,
                is_deleted
            ) VALUES (?, ?, ?, NOW(), FALSE)
        `;
        
        try {
            const [result] = await db.query(city, sql, [
                data.title,
                data.description,
                staffId
            ]);
            
            return result.insertId > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TutorNoticeModel; 