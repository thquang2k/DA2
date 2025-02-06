var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')
const variantController = require('../controllers/variantController')

router.get('/', productController.getAllProduct)
router.get('/laptop', productController.getAllLaptop)
router.get('/cellphone', productController.getAllCellphone)
router.post('/add', productController.addProduct)
router.post('/laptop/add', productController.addLaptop)
router.post('/cellphone/add', productController.addCellphone)

module.exports = router;
