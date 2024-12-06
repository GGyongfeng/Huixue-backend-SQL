const express = require('express')
const router = express.Router()
const TutorsModel = require('@models/tutorsModel')
const resCode = require('@constants/resCode')
const { errorResponse } = require('@utils/errorHandler')
const { validateFilterValue } = require('@types/filters')

router.put('/:id', async (req, res, next) => {
  try {
    console.log('=== 开始处理订单更新 ===')
    console.log('请求参数:', {
      id: req.params.id,
      body: req.body
    })

    const { id } = req.params
    const staffId = req.user?.id || 1

    console.log('正在查询订单信息...')
    // 验证订单是否存在
    const order = await TutorsModel.getById(id)
    console.log('查询结果:', order.id, "存在")

    if (!order) {
      console.log('订单不存在')
      throw errorResponse(
        resCode.NOT_FOUND,
        '订单不存在'
      )
    }

    console.log('开始处理更新数据...')
    // 定义可更新的字段
    const allowedFields = [
      'tutor_code',
      'student_gender',
      'teaching_type',
      'student_grade',
      'subjects',
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
    console.log('允许更新的字段:', allowedFields)

    // 只保留允许更新的字段
    const updateData = {}
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field]
        console.log(`字段 ${field} 将被更新为:`, req.body[field])
      }
    })

    // 验证枚举字段
    console.log('开始验证枚举字段...')
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
        console.log(`验证字段 ${field}:`, updateData[field])
        if (!validateFilterValue(field, updateData[field])) {
          throw errorResponse(
            resCode.INVALID_PARAMS,
            `无效的${field}值`
          )
        }
      }
    })

    // 处理数组字段
    console.log('开始处理数组字段...')
    if (updateData.subjects) {
      console.log('处理 subjects 原始数据:', updateData.subjects)
      
      // 确保 subjects 是数组
      if (!Array.isArray(updateData.subjects)) {
        // 如果是字符串，可能是逗号分隔的格式
        if (typeof updateData.subjects === 'string') {
          updateData.subjects = updateData.subjects.split(',').map(s => s.trim())
        } else {
          updateData.subjects = [updateData.subjects]
        }
      }
      
      console.log('subjects 转换后:', updateData.subjects)
      
      // 验证每个科目是否有效
      const invalidSubjects = updateData.subjects.filter(
        subject => !validateFilterValue('subjects', subject)
      )
      
      if (invalidSubjects.length > 0) {
        console.log('无效的科目:', invalidSubjects)
        throw errorResponse(
          resCode.INVALID_PARAMS,
          `无效的科目: ${invalidSubjects.join(', ')}`
        )
      }
    }

    if (updateData.order_tags) {
      console.log('处理 order_tags 原始数据:', updateData.order_tags)
      
      // 确保 order_tags 是数组
      if (!Array.isArray(updateData.order_tags)) {
        // 如果是字符串，可能是逗号分隔的格式
        if (typeof updateData.order_tags === 'string') {
          updateData.order_tags = updateData.order_tags.split(',').map(s => s.trim())
        } else {
          updateData.order_tags = [updateData.order_tags]
        }
      }
      
      console.log('order_tags 转换后:', updateData.order_tags)
    }

    // 处理布尔值
    if (updateData.is_visible !== undefined) {
      console.log('处理 is_visible:', updateData.is_visible)
      updateData.is_visible = Boolean(updateData.is_visible)
    }

    console.log('最终的更新数据:', updateData)

    // 执行更新
    console.log('开始执行数据库更新...')
    const result = await TutorsModel.update(id, updateData, staffId)
    console.log('更新结果:', result)
    
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
    console.error('发生错误:', error)
    if (error.code) {
      next(error)
    } else {
      next(errorResponse(
        resCode.INTERNAL_ERROR,
        '服务器错误',
        error
      ))
    }
  } finally {
    console.log('=== 订单更新处理结束 ===')
  }
})

module.exports = router 