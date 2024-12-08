const express = require('express');
const router = express.Router();
const menuModel = require('@/models/menuModel');
const resCode = require('@/constants/resCode');
const { errorResponse } = require('@/utils/errorHandler');
const { authMiddleware } = require('@/middleware/auth');

// 获取菜单列表
router.get('/list', authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        const menuData = await menuModel.getMenusByRole(user.role);
        console.log('menuData', menuData);
        
        res.json({
            code: resCode.SUCCESS,
            data: menuData,
            message: '获取菜单成功'
        });
    } catch (error) {
        console.error('获取菜单错误:', error);
        res.json(errorResponse(
            resCode.INTERNAL_ERROR,
            '获取菜单失败',
            error
        ));
    }
});

module.exports = router; 