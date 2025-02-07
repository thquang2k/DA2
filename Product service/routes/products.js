var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')
const variantController = require('../controllers/variantController')

router.get('/', productController.getAllProduct)
router.get('/detail/:productId', productController.getProductById)
router.post('/add', productController.addProduct)
router.delete('/delete/:productId', productController.removeProductById)

router.get('/laptop', productController.getAllLaptop)
router.get('/laptop/detail/:productId', productController.getLaptopById)
router.get('/laptop/detail/:productId/variant', variantController.getAllLaptopVariantsByProductId)
router.post('/laptop/detail/:productId/variant/add', variantController.createLaptopVariant)
router.post('/laptop/add', productController.addLaptop)
router.put('/laptop/update/:productId', productController.updateLaptopById)
router.delete('/laptop/delete/:productId', productController.removeLaptopById)

router.get('/cellphone', productController.getAllCellphone)
router.get('/cellphone/detail/:productId', productController.getCellphoneById)
router.get('/cellphone/detail/:productId/variant', variantController.getAllCellphoneVariantsByProductId)

router.post('/cellphone/add', productController.addCellphone)
router.put('/cellphone/update/:productId', productController.updateCellphoneById)
router.delete('/cellphone/delete/:productId', productController.removeCellphoneById)

module.exports = router;
