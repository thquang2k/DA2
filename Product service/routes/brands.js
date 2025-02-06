var express = require('express');
var router = express.Router();

const brandController = require('../controllers/brandController')

router.get('/', brandController.getAllBrand)

module.exports = router;
