const express = require('express')
const router = express.Router()
const TutorsModel = require('@models/tutorsModel')
const resCode = require('@constants/resCode')
const { validateFilterValue, TUTOR_FILTERS } = require('@types/filters')
const { errorResponse } = require('@utils/errorHandler')

router.get('/', async (req, res, next) => {
  try {
    // console.log('=== list.is : 开始处理列表请求 ===')
    const { 
      page = 1, 
      pageSize = 20, 
      keyword,
      status,
      district,
      is_deleted,
      student_grade,
      student_gender,
      teacher_gender,
      teacher_type,
      subjects,
      teaching_type,
      city,
      order_tags,
      student_level,
      is_visible
    } = req.query

    // console.log('步骤1: 处理筛选条件')
    const processArrayParam = (param) => {
      if (!param) return undefined
      return Array.isArray(param) ? param : [param]
    }

    const filters = {
      status: processArrayParam(status),
      district: processArrayParam(district),
      is_deleted: false,
      student_grade: processArrayParam(student_grade),
      student_gendern: processArrayParam(student_gender),
      teacher_gender: processArrayParam(teacher_gender),
      teacher_type: processArrayParam(teacher_type),
      subjects: processArrayParam(subjects),
      teaching_type: processArrayParam(teaching_type),
      city: processArrayParam(city),
      order_tags: processArrayParam(order_tags),
      student_level: processArrayParam(student_level),
      is_visible: processArrayParam(is_visible)
    }

    // 处理关键词
    if (keyword) {
      filters.keyword = keyword
      // console.log('步骤2: 添加关键词搜索:', keyword)
    }

    // console.log('步骤3: 验证筛选条件')
    // 定义需要验证的字段
    const fieldsToValidate = [
      'student_gender',
      'teaching_type',
      'student_grade',
      'teacher_type',
      'teacher_gender',
      'district',
      'student_level',
      'status',
      'subjects'
    ]

    // 只验证指定的字段
    fieldsToValidate.forEach(field => {
      if (filters[field] && !validateFilterValue(field, filters[field])) {
        throw errorResponse(
          resCode.INVALID_PARAMS,
          `无效的筛选条件: ${field}`
        )
      }
    })

    // console.log('步骤4: 设置分页参数')
    const pagination = {
      page: parseInt(page) || 1,
      pageSize: parseInt(pageSize) || 20
    }

    // console.log('步骤5: 执行数据库查询')
    const result = await TutorsModel.getList(filters, pagination)
    
    // console.log('步骤6: 返回查询结果\n')
    res.json({
      code: resCode.SUCCESS,
      message: '获取成功',
      data: {
        list: result.list,
        total: result.total,
        page: pagination.page,
        pageSize: pagination.pageSize
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router 