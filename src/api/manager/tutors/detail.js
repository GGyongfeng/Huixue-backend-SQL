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

/**
 * 批量获取订单详情
 * 支持通过多个 tutor_code 查询
 */
router.post('/alot', async (req, res) => {
    console.log('收到请求: POST /api/manager/tutors/detail/alot');
    console.log('请求体:', req.body);

    try {
        const { orderCodes } = req.body;
        if (!Array.isArray(orderCodes) || orderCodes.length === 0) {
            console.warn('订单编号数组为空或无效');
            return res.json({
                code: resCode.INVALID_PARAMS,
                message: '订单编号数组不能为空'
            });
        }

        console.log('查询订单编号:', orderCodes);

        const details = await TutorsModel.getDetailsByOrderCodes(req.city, orderCodes);
        console.log('查询结果:', details);

        res.json({
            code: resCode.SUCCESS,
            data: details,
            message: '批量获取成功'
        });
    } catch (error) {
        console.error('批量获取家教订单详情失败:', error);
        res.json({
            code: resCode.INTERNAL_ERROR,
            message: '批量获取详情失败',
            error: error.message
        });
    }
});

module.exports = router 