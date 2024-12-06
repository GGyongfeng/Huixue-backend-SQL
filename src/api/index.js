const express = require('express');
const router = express.Router();

// 引入教师相关路由
const teacherRoutes = require('./teacher');
const managerRoutes = require('./manager');

// 注册路由
router.use('/teacher', teacherRoutes);
router.use('/manager', managerRoutes);

module.exports = router; 