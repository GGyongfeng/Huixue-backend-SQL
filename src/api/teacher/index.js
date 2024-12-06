const express = require('express');
const router = express.Router();

const tutorsListRouter = require('./tutorslist');
const profileRouter = require('./profile');

router.use('/tutorslist', tutorsListRouter);
router.use('/profile', profileRouter);

module.exports = router; 