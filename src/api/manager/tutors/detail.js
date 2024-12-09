const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')

/**
 * 获取订单详情
 * 支持通过 tutor_code 查询
 */
router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params
        const order = await TutorsModel.getById(code)

        if (order) {
            res.json({
                code: resCode.SUCCESS,
                message: '获取成功',
                data: order
            })
        } else {
            res.json({
                code: resCode.NOT_FOUND,
                message: '订单不存在或已被删除'
            })
        }
    } catch (error) {
        console.error('获取家教订单详情失败:', error)
        res.json({
            code: resCode.INTERNAL_ERROR,
            message: '获取详情失败',
            error: error.message
        })
    }
})

module.exports = router 