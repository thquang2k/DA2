var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cartController')

const fetchCurrentUser = require('../middlewares/fetchCurrentUser')

router.get('/',fetchCurrentUser, cartController.getCurrentUserCart)
router.post('/create', cartController.createCart)
router.delete('/delete', cartController.removeCart)
router.post('/add', fetchCurrentUser, cartController.addToCart)
module.exports = router;
