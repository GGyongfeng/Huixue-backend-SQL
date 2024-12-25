const express = require('express')
const router = express.Router()
const TutorsModel = require('@models/tutorsModel')
const resCode = require('@constants/resCode')
const { errorResponse } = require('@utils/errorHandler')
const { validateFilterValue } = require('@types/filters')

router.put('/', async (req, res, next) => {
  try {
    const { id } = req.body
    const staffId = req.user?.id || 1
    const { city } = req

    // 验证订单是否存在
    const order = await TutorsModel.getById(city, id)
    if (!order) {
      throw errorResponse(
        resCode.NOT_FOUND,
        '订单不存在'
      )
    }

    // 定义允许更新的字段
    const allowedFields = [
      'tutor_code',
      'student_gender',
      'teaching_type',
      'student_grade',
      'subjects',
      'subjects_desc',
      'teacher_type',
      'teacher_gender',
      'order_tags',
      'district',
      'city',
      'address',
      'grade_score',
      'student_level',
      'tutoring_time',
      'salary',
      'requirement_desc',
      'is_visible'
    ]

    // 只保留允许更新的字段
    const updateData = {}
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field]
      }
    })

    // 验证枚举字段
    const enumFields = [
      'student_gender',
      'teaching_type',
      'student_grade',
      'teacher_type',
      'teacher_gender',
      'district',
      'student_level'
    ]
    enumFields.forEach(field => {
      if (updateData[field]) {
        // 对于 district 字段，传入城市参数进行验证
        if (field === 'district') {
          if (!validateFilterValue(field, updateData[field], city)) {
            throw errorResponse(
              resCode.INVALID_PARAMS,
              `无效的${field}值`
            )
          }
        } else {
          // 其他字段的验证保持不变
          if (!validateFilterValue(field, updateData[field])) {
            throw errorResponse(
              resCode.INVALID_PARAMS,
              `无效的${field}值`
            )
          }
        }
      }
    })

    // 处理数组字段
    if (updateData.subjects) {
      // 确保 subjects 是数组
      if (!Array.isArray(updateData.subjects)) {
        updateData.subjects = typeof updateData.subjects === 'string' 
          ? updateData.subjects.split(',').map(s => s.trim())
          : [updateData.subjects]
      }
      
      // 验证每个科目是否有效
      const invalidSubjects = updateData.subjects.filter(
        subject => !validateFilterValue('subjects', subject)
      )
      
      if (invalidSubjects.length > 0) {
        throw errorResponse(
          resCode.INVALID_PARAMS,
          `无效的科目: ${invalidSubjects.join(', ')}`
        )
      }
    }

    if (updateData.order_tags) {
      // 确保 order_tags 是数组
      if (!Array.isArray(updateData.order_tags)) {
        updateData.order_tags = typeof updateData.order_tags === 'string'
          ? updateData.order_tags.split(',').map(s => s.trim())
          : [updateData.order_tags]
      }
    }

    // 处理布尔值
    if (updateData.is_visible !== undefined) {
      updateData.is_visible = Boolean(updateData.is_visible)
    }

    // 执行更新
    const result = await TutorsModel.update(city, id, updateData, staffId)
    if (!result) {
      throw errorResponse(
        resCode.OPERATION_FAILED,
        '更新失败'
      )
    }

    res.json({
      code: resCode.SUCCESS,
      message: '更新成功'
    })

  } catch (error) {
    if (error.code) {
      next(error)
    } else {
      next(errorResponse(
        resCode.INTERNAL_ERROR,
        '服务器错误',
        error
      ))
    }
  }
})

module.exports = router 