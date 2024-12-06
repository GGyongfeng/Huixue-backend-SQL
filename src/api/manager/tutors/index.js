const express = require('express')
const router = express.Router()

/**
 * 家教订单管理路由
 * 
 * POST /api/manager/tutors/create
 * 创建家教订单
 * 请求体：{
 *   tutor_code: string,     // 订单编号
 *   student_gender: enum,   // 学生性别：男/女
 *   teaching_type: enum,    // 教学类型：一对一/一对多
 *   student_grade: enum,    // 年级
 *   subjects: array,        // 科目数组
 *   teacher_type: enum,     // 教师类型要求
 *   teacher_gender: enum,   // 教师性别要求
 *   order_tags: array,      // 订单标签数组
 *   district: enum,         // 区域
 *   city: string,          // 城市
 *   address: string,       // 详细地址
 *   grade_score: string,   // 成绩
 *   student_level: enum,   // 学生水平
 *   tutoring_time: string, // 补习时间
 *   salary: string,        // 薪资信息
 *   requirement_desc: text // 需求描述
 * }
 * 
 * PUT /api/manager/tutors/update/:id
 * 更新家教订单信息
 * 参数：id - 订单ID
 * 请求体：与创建接口相同，所有字段都是可选的
 * 
 * DELETE /api/manager/tutors/delete/:id
 * 软删除家教订单
 * 参数：id - 订单ID
 * 
 * GET /api/manager/tutors/list
 * 获取家教订单列表
 * 查询参数：
 *   page: number,          // 页码，默认1
 *   pageSize: number,      // 每页条数，默认10
 *   keyword: string,       // 搜索关键词
 *   status: enum,          // 订单状态：已成交/未成交
 *   district: enum,        // 区域筛选
 *   is_deleted: boolean    // 是否已删除
 * 
 * GET /api/manager/tutors/detail/:id
 * 获取家教订单详情
 * 参数：id - 订单ID
 * 
 * PUT /api/manager/tutors/deal/:id/deal
 * 将订单标记为已成交
 * 参数：id - 订单ID
 * 请求体：{
 *   teacherId: number      // 成交教师ID
 * }
 * 
 * 所有接口都需要认证，需要在请求头中携带 token
 * 响应格式：{
 *   code: number,          // 状态码：0-成功，其他-失败
 *   message: string,       // 提示信息
 *   data?: any            // 响应数据，可选
 * }
 */

// 引入各个子路由
const createRouter = require('./create')
const updateRouter = require('./update')
const deleteRouter = require('./delete')
const listRouter = require('./list')
const detailRouter = require('./detail')
const dealRouter = require('./deal')

// 注册子路由
router.use('/create', createRouter)
router.use('/update', updateRouter)
router.use('/delete', deleteRouter)
router.use('/list', listRouter)
router.use('/detail', detailRouter)
router.use('/deal', dealRouter)

module.exports = router 