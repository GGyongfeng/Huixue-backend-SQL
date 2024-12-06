const express = require('express');
const configureMiddleware = require('./middleware');
const routes = require('./routes');

const app = express();

// 1. 首先执行所有配置的中间件
configureMiddleware(app);

// 2. 然后是路由处理
app.use('/', routes);

// 3. 最后是错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    
    // 处理 errorHandler 创建的错误对象
    if (err.code) {  // errorHandler 创建的错误对象都有 code 属性
        return res.status(err.code).json({
            code: err.code,
            message: err.message,
            data: null
        });
    }

    // 处理其他未知错误
    res.status(500).json({
        code: 500,
        data: null,
        message: '服务器内部错误'
    });
});

module.exports = app; 