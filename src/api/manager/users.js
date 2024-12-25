const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const staffModel = require('@/models/staffModel');
const resCode = require('@/constants/resCode');
const { errorResponse } = require('@/utils/errorHandler');

// 登录接口
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 验证参数
        if (!username || !password) {
            return res.json({
                code: resCode.INVALID_PARAMS,
                message: '用户名和密码不能为空'
            });
        }

        // 查找用户
        const user = await staffModel.findByUsername(username);
        console.log('登录用户信息:', user);

        if (!user) {
            return res.json({
                code: resCode.NOT_FOUND,
                message: '用户不存在'
            });
        }

        // 验证密码
        if (user.password !== password) {
            return res.json({
                code: resCode.INVALID_PARAMS,
                message: '密码错误'
            });
        }

        // 生成 token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
                city: user.city
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        // 获取完整的用户信息
        const userInfo = await staffModel.getFullUserInfo(user.city, user.id);

        // 返回登录成功信息
        res.json({
            code: resCode.SUCCESS,
            message: '登录成功',
            data: {
                token,
                userInfo
            }
        });

    } catch (error) {
        console.error('服务器错误:', error);
        res.json(errorResponse(
            resCode.INTERNAL_ERROR,
            '登录失败',
            error
        ));
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