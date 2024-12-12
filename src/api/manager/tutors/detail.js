const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')

/**
 * 获取订单详情
 * 支持通过 tutor_code 查询
 */
router.get('/:id', async (req, res) => {
    try {
        const detail = await TutorsModel.getById(req.city, req.params.id);
        res.json({
            code: resCode.SUCCESS,
            data: detail,
            message: '获取成功'
        });
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