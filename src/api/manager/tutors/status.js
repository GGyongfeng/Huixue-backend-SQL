const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')
const { errorResponse } = require('@/utils/errorHandler')

router.put('/', async (req, res, next) => {
    try {
        const { ids, status } = req.body
        const city = req.city

        console.log('=== 批量更新订单可见状态 ===')
        console.log('请求数据:', {
            ids,
            status,
            statusText: status === 1 ? '显示' : '隐藏'
        })

        // 调用模型方法更新可见状态
        const success = await TutorsModel.updateVisibility(
            city,
            ids,
            Boolean(status)
        )

        if (success) {
            res.json({
                code: resCode.SUCCESS,
                message: `批量${status === 1 ? '显示' : '隐藏'}成功`
            })
        } else {
            throw errorResponse(
                resCode.OPERATION_FAILED,
                '更新失败'
            )
        }
        
    } catch (error) {
        console.error('更新状态失败:', error)
        next(errorResponse(
            resCode.INTERNAL_ERROR,
            '更新失败',
            error
        ))
    }
})

module.exports = router 