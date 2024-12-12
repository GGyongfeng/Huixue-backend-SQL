const express = require('express');
const router = express.Router();
const cityResolver = require('@/middleware/cityResolver');

// 所有教师端接口都需要解析城市
router.use(cityResolver);

// 注册所有路由
router.use('/tutorslist', require('./tutorslist'));
router.use('/profile', require('./profile'));
router.use('/tutornotice', require('./tutornotice'));

// 统一错误处理中间件
router.use((err, req, res, next) => {
    if (err.message.includes('未找到城市')) {
        return res.status(400).json({
            code: 400,
            message: '无效的城市参数'
        });
    }
    next(err);
});

module.exports = router; 