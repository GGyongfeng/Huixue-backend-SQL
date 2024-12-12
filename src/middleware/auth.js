const jwt = require('jsonwebtoken');
const { CITY_CODES } = require('../data/dbManager');

const authMiddleware = async (req, res, next) => {
    console.log('\n=== Auth Middleware Start ===');
    console.log('Request Path:', req.path);
    console.log('Authorization Header:', req.headers.authorization ? 'Present' : 'Missing');
    
    try {
        // 从请求头获取 token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log('Error: No token provided');
            return res.status(401).json({
                code: 401,
                message: '未提供认证令牌'
            });
        }

        // 验证 token
        console.log('Verifying token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Token decoded:', {
            username: decoded.username,
            role: decoded.role,
            city: decoded.city
        });
        
        // 获取用户信息
        let city = decoded.city || '天津';  // 从 token 中获取城市，默认天津
        
        // 如果 token 中的城市代码是简写形式，转换为完整城市名
        if (CITY_CODES[city]) {
            // 如果已经是完整城市名，保持不变
            city = city;
        } else {
            // 查找对应的城市名
            const cityName = Object.entries(CITY_CODES).find(([name, code]) => code === city)?.[0];
            if (cityName) {
                city = cityName;
            }
        }
        console.log('Resolved city:', city);

        // 直接使用 token 中的信息
        req.user = {
            username: decoded.username,
            role: decoded.role,
            city: decoded.city,
            id: decoded.id
        };
        req.city = city;

        console.log('Auth successful, added to request:', {
            city: req.city,
            userId: req.user.id,
            role: req.user.role
        });

        console.log('=== Auth Middleware End ===\n');
        next();
    } catch (error) {
        console.error('Auth Error:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                code: 401,
                message: '无效的认证令牌'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                code: 401,
                message: '认证令牌已过期'
            });
        }
        next(error);
    }
};

module.exports = {
    authMiddleware
};