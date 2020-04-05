const express = require('express');
const router = express.Router();

const adminRouter = require('./admin');
const shopRouter = require('./shop');

router.use('/admin', adminRouter);
router.use('/shop', shopRouter);

module.exports = router;
