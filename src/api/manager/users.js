const express = require('express');
const jwt = require('jsonwebtoken');
const staffModel = require('@/models/staffModel');
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

/**
 * @typedef {import('@/types').UserInfo} UserInfo
 * @typedef {import('@/types').ApiResponse} ApiResponse
 */

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // 只查询基本信息进行登录验证
        const staff = await staffModel.findByUsername(username);
        
        // 先检查用户是否存在
        if (!staff) {
            return res.json({
                code: 400,
                data: null,
                message: '用户不存在'
            });
        }

        // 用户存在，再检查密码
        if (password !== staff.password) {
            return res.json({
                code: 400,
                data: null,
                message: '密码错误'
            });
        }

        // 登录成功，生成token
        const token = jwt.sign(
            { 
                id: staff.id, 
                username: staff.username
            },
            SECRET_KEY,
            { expiresIn: '30 days' }
        );
        
        // 登录成功后，如果需要详细信息再查询一次
        const userInfo = await staffModel.getFullUserInfo(staff.id);
        
        const response = {
            code: 200,
            data: {
                id: staff.id,
                username: staff.username,
                name: userInfo?.real_name || staff.username,  // 如果没有真实姓名，使用用户名
                avatar: userInfo?.avatar_url || '',
                token: token
            },
            message: '登录成功'
        };
        
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, name, role, ...otherData } = req.body;
        
        // 检查用户是否已存在
        const [existingStaffs] = await staffModel.findByUsername(username);
        if (existingStaffs.length > 0) {
            return res.json({
                code: 400,
                data: null,
                message: '用户名已存在'
            });
        }

        // 创建新用户，适配新的数据库结构
        const staffId = await staffModel.createStaff({
            username,
            password,
            real_name: name,  // 使用 name 作为 real_name
            city: otherData.city || '天津市',
            sex: otherData.sex || '男',
            // 其他字段可以设置默认值
            nike_name: null,
            email: null,
            mobile: null,
            address: null,
            des: null,
            education: null
        });

        res.json({
            code: 200,
            data: { id: staffId },
            message: '注册成功'
        });
    } catch (error) {
        next(error);
    }
});

// 获取个人信息
router.get('/profile', async (req, res, next) => {
    try {
        const userId = req.user.id;  // 从鉴权中间件获取用户ID
        
        const [staffs] = await staffModel.findById(userId);
        const staff = staffs[0];

        if (!staff) {
            return res.json({
                code: 404,
                data: null,
                message: '用户不存在'
            });
        }

        res.json({
            code: 200,
            data: {
                id: staff.id,
                username: staff.username,
                name: staff.real_name,
                avatar: staff.avatar,
                email: staff.email,
                mobile: staff.mobile,
                address: staff.address,
                sex: staff.sex,
                city: staff.city,
                education: staff.education,
                description: staff.des
            },
            message: '获取成功'
        });
    } catch (error) {
        next(error);
    }
});

// 更新个人信息
router.put('/profile', async (req, res, next) => {
    try {
        const userId = req.user.id;  // 从鉴权中间件获取用户ID
        const updateData = req.body;

        // 更新用户信息
        await staffModel.updateStaff(userId, {
            real_name: updateData.name,
            email: updateData.email,
            mobile: updateData.mobile,
            address: updateData.address,
            sex: updateData.sex,
            city: updateData.city,
            education: updateData.education,
            des: updateData.description,
            avatar: updateData.avatar
        });

        res.json({
            code: 200,
            data: null,
            message: '更新成功'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 