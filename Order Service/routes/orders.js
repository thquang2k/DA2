var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController')

router.get('/', orderController.getAllOrder)
router.get('/:orderId', orderController.getOrderById)
router.post('/create', orderController.createOrder)

module.exports = router;
