const cors = require('cors');
const bodyParser = require('body-parser');
const { authMiddleware } = require('./auth');

const configureMiddleware = (app) => {
    // CORS 中间件
    app.use(cors({
        origin: '*',
        credentials: true
    }));

    // 请求日志中间件
    app.use((req, res, next) => {
        console.log('\n收到请求:', req.method, req.url);
        next();
    });

    // body-parser 中间件
    app.use(bodyParser.json());

    // API 鉴权中间件，但排除登录相关的路径
    app.use('/api', (req, res, next) => {
        // 需要精确匹配的公开路径
        const exactPublicPaths = [
            '/api/manager/users/login',
            '/api/manager/users/register'
        ];
        
        // 需要前缀匹配的公开路径（及其所有子路径）
        const prefixPublicPaths = [
            '/api/teacher'
        ];
        
        // 如果是精确匹配的公开路径
        if (exactPublicPaths.includes(req.originalUrl)) {
            return next();
        }
        
        // 如果是前缀匹配的公开路径
        if (prefixPublicPaths.some(prefix => req.originalUrl.startsWith(prefix))) {
            return next();
        }

        // 否则进行鉴权
        authMiddleware(req, res, next);
    });
};

module.exports = configureMiddleware; 