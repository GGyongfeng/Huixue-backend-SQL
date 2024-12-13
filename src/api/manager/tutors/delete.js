const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')

router.post('/', async (req, res) => {
  try {
    const { ids } = req.body
    const staffId = req.user.id
    const city = req.city

    console.log('=== 批量删除订单 ===')
    console.log('请求数据:', { 
      ids, 
      staffId,
      city 
    })

    const success = await TutorsModel.batchDelete(city, ids)
    
    if (success) {
      res.json({
        code: resCode.SUCCESS,
        message: '批量删除成功'
      })
    } else {
      res.json({
        code: resCode.NOT_FOUND,
        message: '订单不存在或已被删除'
      })
    }
  } catch (error) {
    console.error('批量删除家教订单失败:', error)
    res.json({
      code: resCode.INTERNAL_ERROR,
      message: '删除失败',
      error: error.message
    })
  }
})

module.exports = router 