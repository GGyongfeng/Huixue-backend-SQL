const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')

router.post('/', async (req, res) => {
  try {
    const data = req.body
    const staffId = req.user.id

    // 创建订单
    const orderId = await TutorsModel.create(data, staffId)
    
    res.json({
      code: 0,
      message: '创建成功',
      data: { id: orderId }
    })
  } catch (error) {
    console.log('创建失败:', error.message);
    
    // 区分错误类型
    if (error.message === '订单编号已存在') {
      res.json({
        code: 400,
        message: '订单编号已存在，请更换编号'
      })
    } else {
      res.json({
        code: 500,
        message: '创建失败'
      })
    }
  }
})

module.exports = router 