var express = require('express');
var router = express.Router();

const vnpController = require('../controllers/vnpController')

router.get('/create_payment_url', vnpController.createPaymentUrl)

module.exports = router;
