const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// 导出中间件函数
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('此请求路径：', req.url, '未提供认证令牌');
        return res.status(401).json({
            code: 401,
            data: null,
            message: '未提供认证令牌'
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({  // 这里也要设置状态码
            code: 401,
            data: null,
            message: '登录信息已过期,请重新登录'
        });
    }
};

module.exports = {
    authMiddleware
};