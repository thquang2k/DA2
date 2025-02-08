var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController')

router.get('/', orderController.getAllOrder)
router.post('/create', orderController.createOrder)

module.exports = router;
