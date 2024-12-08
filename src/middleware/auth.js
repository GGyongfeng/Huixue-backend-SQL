const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const resCode = require('@/constants/resCode');

// 角色权限等级
const ROLE_LEVELS = {
    'admin': 4,    // 管理员最高权限
    'manager': 3,  // 经理次高权限
    'staff': 2,    // 普通员工
    'visitor': 1   // 游客最低权限
};

// 验证token的中间件
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('此请求路径：', req.url, '未提供认证令牌');
        return res.status(401).json({
            code: resCode.UNAUTHORIZED,
            data: null,
            message: '未提供认证令牌'
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // 将解码后的用户信息存储到req对象中
        next();
    } catch (error) {
        return res.status(401).json({
            code: resCode.UNAUTHORIZED,
            data: null,
            message: '登录信息已过期,请重新登录'
        });
    }
};

// 角色验证中间件
const roleAuth = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        
        if (!userRole || !ROLE_LEVELS[userRole]) {
            return res.status(403).json({
                code: resCode.FORBIDDEN,
                data: null,
                message: '无效的用户角色'
            });
        }

        // 检查用户角色等级是否满足要求
        if (ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole]) {
            next();
        } else {
            return res.status(403).json({
                code: resCode.FORBIDDEN,
                data: null,
                message: '权限不足'
            });
        }
    };
};

// 多角色验证中间件
const multiRoleAuth = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        
        if (!userRole || !ROLE_LEVELS[userRole]) {
            return res.status(403).json({
                code: resCode.FORBIDDEN,
                data: null,
                message: '无效的用户角色'
            });
        }

        // 检查用户角色是否在允许的角色列表中
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            return res.status(403).json({
                code: resCode.FORBIDDEN,
                data: null,
                message: '权限不足'
            });
        }
    };
};

module.exports = {
    authMiddleware,
    roleAuth,
    multiRoleAuth
};