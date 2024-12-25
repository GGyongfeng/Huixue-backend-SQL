const express = require('express')
const router = express.Router()
const TutorNoticeModel = require('@/models/tutorNoticeModel')
const resCode = require('@/constants/resCode')

/**
 * 更新通知
 * 如果不提供id，则更新最新的一条通知
 */
router.put('/', async (req, res) => {
    try {
        const { id, title, description } = req.body;
        const city = req.city;
        const staffId = req.user?.id || 1;

        let noticeId = id;
        if (!noticeId) {
            const latestNotice = await TutorNoticeModel.getLatestNotice(city);
            
            if (!latestNotice) {
                const success = await TutorNoticeModel.create(city, {
                    title,
                    description
                }, staffId);

                return res.json({
                    code: success ? resCode.SUCCESS : resCode.INTERNAL_ERROR,
                    message: success ? '创建成功' : '创建失败'
                });
            }
            noticeId = latestNotice.id;
        }

        const success = await TutorNoticeModel.update(city, noticeId, {
            title,
            description
        }, staffId);

        if (success) {
            res.json({
                code: resCode.SUCCESS,
                message: '更新成功'
            });
        } else {
            res.json({
                code: resCode.INTERNAL_ERROR,
                message: '更新失败'
            });
        }
    } catch (error) {
        res.json({
            code: resCode.INTERNAL_ERROR,
            message: '更新通知失败',
            error: error.message
        });
    }
});

module.exports = router 