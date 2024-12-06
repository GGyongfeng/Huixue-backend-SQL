const express = require('express');
const router = express.Router();
const path = require('path');

// 获取项目根目录的绝对路径
const rootPath = path.resolve(__dirname, '../..');

// 配置manager静态文件
router.use(express.static(path.join(rootPath, 'public/client/manager'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        }
        else if (filePath.endsWith('.css')) {
            res.set('Content-Type', 'text/css; charset=utf-8');
        }
    }
}));

// 处理manager的SPA路由
router.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'public/client/manager/index.html'));
});

module.exports = router; 