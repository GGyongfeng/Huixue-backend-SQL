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
        const { id, title, description } = req.body
        const staffId = 1
        console.log('staffId', staffId)
        console.log('req.body', req.body)

        // 如果没有提供id，获取最新的一条通知
        let noticeId = id
        if (!noticeId) {
            const latestNotice = await TutorNoticeModel.getLatestNotice()
            if (!latestNotice || latestNotice.length === 0) {
                return res.json({
                    code: resCode.NOT_FOUND,
                    message: '没有可更新的通知'
                })
            }
            noticeId = latestNotice.id
        }

        // 检查通知是否存在
        console.log('准备检查通知:', noticeId)
        const notice = await TutorNoticeModel.getById(noticeId)
        console.log('检查通知结果:', notice)
        if (!notice) {
            return res.json({
                code: resCode.NOT_FOUND,
                message: '通知不存在或已被删除'
            })
        }

        // 更新通知
        const success = await TutorNoticeModel.update(noticeId, {
            title,
            description
        }, staffId)

        if (success) {
            res.json({
                code: resCode.SUCCESS,
                message: '更新成功'
            })
        } else {
            res.json({
                code: resCode.INTERNAL_ERROR,
                message: '更新失败'
            })
        }
    } catch (error) {
        console.error('更新通知失败:', error)
        res.json({
            code: resCode.INTERNAL_ERROR,
            message: '更新通知失败',
            error: error.message
        })
    }
})

module.exports = router 