const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')
const { errorResponse } = require('@/utils/errorHandler')

router.put('/', async (req, res, next) => {
  try {
    console.log('=== 开始处理订单状态更新 ===')
    const { ids, teacherId = null, status = '已成交' } = req.body
    const staffId = req.user?.id || 1
    const city = req.city
    
    console.log('请求数据:', {
      ids,
      teacherId,
      status,
      staffId
    })

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
        const teacherExists = await TutorsModel.checkTeacherExists(city, teacherId)
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
    let success
    if (status === '已成交') {
      success = await TutorsModel.batchMarkAsDeal(city, ids, teacherId, staffId)
    } else {
      success = await TutorsModel.batchMarkAsUnDeal(city, ids, staffId)
    }
    
    console.log('批量更新结果:', success)

    if (!success) {
      throw errorResponse(
        resCode.OPERATION_FAILED,
        '更新失败'
      )
    }

    res.json({
      code: resCode.SUCCESS,
      message: `批量${status === '已成交' ? '成交' : '取消成交'}成功`
    })

  } catch (error) {
    console.error('更新状态失败:', error)
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