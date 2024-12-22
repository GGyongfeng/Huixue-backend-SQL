const express = require('express')
const router = express.Router()
const TutorsModel = require('@models/tutorsModel')
const resCode = require('@constants/resCode')
const { errorResponse } = require('@/utils/errorHandler')
const { validateFilterValue } = require('@types/filters')

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
    const { 
      page = 1, 
      pageSize = 20,
      keyword,
      district,
      student_grade,
      student_gender,
      teacher_gender,
      teacher_type,
      subjects,
      teaching_type,
      order_tags
    } = req.query;
    
    const city = req.city;
    console.log('Using city:', city);

    // 处理筛选参数
    const processArrayParam = (param) => {
      if (!param) return undefined
      return Array.isArray(param) ? param : [param]
    }

    const filters = {
      district: processArrayParam(district),
      student_grade: processArrayParam(student_grade),
      student_gender: processArrayParam(student_gender),
      teacher_gender: processArrayParam(teacher_gender),
      teacher_type: processArrayParam(teacher_type),
      subjects: processArrayParam(subjects),
      teaching_type: processArrayParam(teaching_type),
      order_tags: processArrayParam(order_tags)
    }

    // 添加关键词搜索
    if (keyword) {
      filters.keyword = keyword
    }

    // 验证筛选条件
    const fieldsToValidate = [
      'student_gender',
      'teaching_type',
      'student_grade',
      'teacher_type',
      'teacher_gender',
      'district',
      'subjects'
    ]

    // 验证筛选值
    fieldsToValidate.forEach(field => {
      if (filters[field]) {
        // 对于 district 字段，需要传入城市参数进行验证
        if (field === 'district') {
          if (!validateFilterValue(field, filters[field], city)) {
            throw new Error(`无效的筛选条件: ${field}`)
          }
        } else {
          // 其他字段的验证保持不变
          if (!validateFilterValue(field, filters[field])) {
            throw new Error(`无效的筛选条件: ${field}`)
          }
        }
      }
    })

    const result = await TutorsModel.getTeacherList(city, filters, {
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    });

    res.json({
      code: resCode.SUCCESS,
      data: result
    });
  } catch (error) {
    console.error('Error in tutorslist:', error);
    res.json({
      code: resCode.INVALID_PARAMS,
      message: error.message
    });
  }
});

module.exports = router
