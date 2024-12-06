const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const staffId = req.user.id

    const success = await TutorsModel.delete(id, staffId)
    
    if (success) {
      res.json({
        code: resCode.SUCCESS,
        message: '删除成功'
      })
    } else {
      res.json({
        code: 404,
        message: '订单不存在或已被删除'
      })
    }
  } catch (error) {
    console.error('删除家教订单失败:', error)
    res.json({
      code: 500,
      message: '删除失败'
    })
  }
})

module.exports = router 