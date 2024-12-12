const db = require('../data/dbManager');

class TutorNoticeModel {
    static async getLatestNotice(city) {
        const sql = `
            SELECT title, description
            FROM notifications
            WHERE is_deleted = FALSE
            ORDER BY created_at DESC
            LIMIT 1
        `;
        
        try {
            const result = await db.query(city, sql);
            return result[0];
        } catch (error) {
            console.error('获取通知失败:', error);
            throw error;
        }
    }
}

module.exports = TutorNoticeModel; 