const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const menuData = require('@/data/menulist.json');

// 从 JSON 文件获取菜单列表
router.get('/list', async (req, res) =>  {
    try {
        res.json({
            code: 200,
            data: menuData,
            message: '获取菜单成功'
        });
    } catch (error) {
        console.error('获取菜单错误:', error);
        res.json({
            code: 500,
            data: null,
            message: '获取菜单失败：' + error.message
        });
    }
});

module.exports = router; 