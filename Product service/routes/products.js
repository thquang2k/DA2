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
router.put('/laptop/:productId/edit', productController.updateLaptopById)
router.put('/cellphone/:productId/edit', productController.updateCellphoneById)
router.delete('/delete/:productId', productController.removeProductById)
router.delete('/laptop/delete/:productId', productController.removeLaptopById)
router.delete('/cellphone/delete/:productId', productController.removeCellphoneById)

router.get('/laptop/:productId/variant', variantController.getAllLaptopVariantsByProductId)
router.get('/cellphone/:productId/variant', variantController.getAllCellphoneVariantsByProductId)
router.post('/laptop/:productId/variant/add', variantController.createLaptopVariant)

module.exports = router;
