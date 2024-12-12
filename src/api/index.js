const express = require('express');
const router = express.Router();

// 注册所有路由
router.use('/teacher', require('./teacher'));
router.use('/manager', require('./manager'));

module.exports = router; 