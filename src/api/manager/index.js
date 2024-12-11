const express = require('express');
const router = express.Router();

const tutorsRouter = require('./tutors');
const usersRouter = require('./users');
const menuRouter = require('./menu');
const tutorNoticeRouter = require('./tutornotice');

router.use('/tutors', tutorsRouter);
router.use('/users', usersRouter);
router.use('/menu', menuRouter);
router.use('/tutornotice', tutorNoticeRouter);


module.exports = router; 