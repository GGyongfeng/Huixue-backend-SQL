const express = require('express')
const router = express.Router()
const TutorsModel = require('@models/tutorsModel')
const resCode = require('@constants/resCode')
const { errorResponse } = require('@/utils/errorHandler')

/**
 * 获取家教列表
 * 
 * @api {GET} /api/teacher/tutorslist
 * 
 * @apiExample {curl} 请求示例:
 * # 基础查询
 * GET /api/teacher/tutorslist
 * GET /api/teacher/tutorslist?page=1&pageSize=20
 * 
 * # 关键词搜索
 * GET /api/teacher/tutorslist?keyword=数学老师
 * 
 * # 地区筛选(支持多选)
 * GET /api/teacher/tutorslist?city=北京&district[]=海淀区&district[]=朝阳区
 * 
 * # 年级筛选(支持多选)
 * GET /api/teacher/tutorslist?student_grade[]=高一&student_grade[]=高二
 * 
 * # 性别筛选(支持多选)
 * GET /api/teacher/tutorslist?student_gender[]=男&student_gender[]=女&teacher_gender[]=女
 * 
 * # 教师类型(支持多选)
 * GET /api/teacher/tutorslist?teacher_type[]=在职教师&teacher_type[]=大学生
 * 
 * # 科目筛选(支持多选)
 * GET /api/teacher/tutorslist?subjects[]=数学&subjects[]=英语
 * 
 * # 授课方式(支持多选)
 * GET /api/teacher/tutorslist?teaching_type[]=一对一&teaching_type[]=一对多
 * 
 * # 组合查询示例
 * GET /api/teacher/tutorslist?city[]=北京&district[]=海淀区&subjects[]=数学&teaching_type[]=一对一&page=1&pageSize=20
 * 
 * @apiParam {Number} [page=1] 页码
 * @apiParam {Number} [pageSize=20] 每页条数
 * @apiParam {String} [keyword] 关键词搜索
 * @apiParam {String} [district] 区域
 * @apiParam {String} [student_grade] 学生年级
 * @apiParam {String} [student_gender] 学生性别
 * @apiParam {String} [teacher_gender] 教师性别
 * @apiParam {String} [teacher_type] 教师类型
 * @apiParam {String|Array} [subjects] 科目(可多选)
 * @apiParam {String} [teaching_type] 授课方式
 * @apiParam {String} [city] 城市
 */

router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const city = req.city;  // 从请求对象获取城市信息
    console.log('Using city:', city);  // 调试日志

    const result = await TutorsModel.getTeacherList(city, {
      // filters
    }, {
      page,
      pageSize
    });

    res.json({
      code: 200,
      data: result
    });
  } catch (error) {
    console.error('Error in tutorslist:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router
