const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const order = await TutorsModel.getById(id)
    
    if (order) {
      res.json({
        code: 0,
        message: '获取成功',
        data: order
      })
    } else {
      res.json({
        code: 404,
        message: '订单不存在或已被删除'
      })
    }
  } catch (error) {
    console.error('获取家教订单详情失败:', error)
    res.json({
      code: 500,
      message: '获取详情失败'
    })
  }
})

module.exports = router 