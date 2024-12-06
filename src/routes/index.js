const express = require('express');
const router = express.Router();
const apiRoutes = require('@/api');
const staticRoutes = require('@/static');

// 注册 API 路由
router.use('/api', apiRoutes);

// 注册静态资源路由
router.use('/', staticRoutes);

module.exports = router; 