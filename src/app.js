const express = require('express');
const configureMiddleware = require('./middleware');
const routes = require('./routes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

// 1. 配置中间件
configureMiddleware(app);

// 2. 然后是路由处理
app.use('/', routes);

// 3. 最后是错误处理中间件
app.use(errorHandler);

module.exports = app; 