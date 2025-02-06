var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')
const variantController = require('../controllers/variantController')

router.get('/', productController.getAllProduct)
router.get('/laptop', productController.getAllLaptop)
router.get('/cellphone', productController.getAllCellphone)

module.exports = router;
