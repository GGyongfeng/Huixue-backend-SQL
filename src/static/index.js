const express = require('express');
const router = express.Router();
const managerRoutes = require('./manager');
const teacherRoutes = require('./teacher');

router.use('/manager', managerRoutes);
router.use('/teacher', teacherRoutes);

// 重定向根路径到manager
router.get('/', (req, res) => {
    res.redirect('/teacher');
});

module.exports = router; 