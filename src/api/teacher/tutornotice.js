const express = require('express')
const router = express.Router()
const TutorNoticeModel = require('@/models/tutorNoticeModel')
const resCode = require('@/constants/resCode')

/**
 * 获取最新的一条未删除通知
 */
router.get('/', async (req, res) => {
    try {
        console.log('Getting notice for city:', req.city);
        const notice = await TutorNoticeModel.getLatestNotice(req.city);
        
        if (notice) {
            res.json({
                code: resCode.SUCCESS,
                message: '获取成功',
                data: {
                    title: notice.title,
                    description: notice.description
                }
            });
        } else {
            res.json({
                code: resCode.NOT_FOUND,
                message: '暂无通知',
                data: null
            });
        }
    } catch (error) {
        console.error('获取通知失败:', error);
        res.json({
            code: resCode.INTERNAL_ERROR,
            message: '获取通知失败',
            error: error.message
        });
    }
});

module.exports = router; 