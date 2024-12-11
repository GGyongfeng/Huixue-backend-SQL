const express = require('express')
const router = express.Router()

const updateRouter = require('./update')

router.use('/update', updateRouter)

module.exports = router 