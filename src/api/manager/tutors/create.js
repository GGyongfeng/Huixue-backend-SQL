const express = require('express')
const router = express.Router()
const TutorsModel = require('@/models/tutorsModel')
const resCode = require('@/constants/resCode')

router.post('/', async (req, res) => {
  try {
    const data = req.body
    const staffId = req.user.id
    const city = req.city

    // 在允许创建的字段列表中添加 subjects_desc
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
      'phone_number',
      'order_source'
    ]

    // 创建订单
    const orderId = await TutorsModel.create(city, data, staffId)
    
    res.json({
      code: resCode.SUCCESS,
      message: '创建成功',
      data: { id: orderId }
    })
  } catch (error) {
    console.log('创建失败:', error.message);
    
    // 区分错误类型
    if (error.message === '订单编号已存在') {
      res.json({
        code: resCode.INVALID_PARAMS,
        message: '订单编号已存在，请更换编号'
      })
    } else {
      res.json({
        code: resCode.INTERNAL_ERROR,
        message: '创建失败',
        error: error.message
      })
    }
  }
})

module.exports = router 