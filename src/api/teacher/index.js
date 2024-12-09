const express = require('express');
const router = express.Router();

const tutorsListRouter = require('./tutorslist');
const profileRouter = require('./profile');
const tutorNoticeRouter = require('./tutornotice');

router.use('/tutorslist', tutorsListRouter);
router.use('/profile', profileRouter);
router.use('/tutornotice', tutorNoticeRouter);
module.exports = router; 