const express = require('express');
const router = express.Router();

// 获取个人信息
router.get('/', async (req, res) => {
    try {
        res.json({
            code: 200,
            data: {},
            message: '获取成功'
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            data: null,
            message: '获取个人信息失败'
        });
    }
});

module.exports = router; 