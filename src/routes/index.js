const express = require('express');
const router = express.Router();
const path = require('path');
const apiRoutes = require('@/api');
const assetsRoutes = require('@/assets');

// 1. 完全公开的静态资源（如默认头像、公共图片等）
router.use('/static', express.static(path.join(__dirname, '../../public')));

// 2. 需要控制访问的资源（如用户上传的文件、私有视频等）
router.use('/assets', assetsRoutes);

// 3. API 路由
router.use('/api', apiRoutes);

module.exports = router; 