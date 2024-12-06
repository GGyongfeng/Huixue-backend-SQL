const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')
const { errorResponse } = require('@/utils/errorHandler')

router.put('/:id', async (req, res, next) => {
  try {
    console.log('=== 开始处理订单状态更新 ===')
    console.log('请求参数:', {
      id: req.params.id,
      body: req.body
    })

    const { id } = req.params
    const { teacherId = null, status = '已成交' } = req.body
    const staffId = req.user?.id || 1
    
    // 验证 staffId
    if (!staffId) {
      throw errorResponse(
        resCode.INVALID_PARAMS,
        '管理员ID不能为空'
      )
    }

    // 如果指定了教师ID，验证教师是否存在
    if (teacherId) {
      try {
        const teacherExists = await TutorsModel.checkTeacherExists(teacherId)
        if (!teacherExists) {
          return res.json({
            code: resCode.DATA_NOT_FOUND,
            message: '指定的教师不存在'
          })
        }
      } catch (error) {
        return res.json({
          code: resCode.INTERNAL_ERROR,
          message: '验证教师信息失败'
        })
      }
    }

    // 根据状态选择不同的处理方法
    let result
    if (status === '已成交') {
      result = await TutorsModel.markAsDeal(id, teacherId, staffId)
    } else {
      result = await TutorsModel.markAsUnDeal(id, staffId)
    }
    
    console.log('Model 更新结果:', result)

    if (!result) {
      throw errorResponse(
        resCode.OPERATION_FAILED,
        '更新失败'
      )
    }

    res.json({
      code: resCode.SUCCESS,
      message: status === '已成交' ? '订单已成交' : '已取消成交'
    })

  } catch (error) {
    // 关键：使用 next() 传递错误
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
    console.log('=== 订单状态更新处理结束 ===')
  }
})

module.exports = router 