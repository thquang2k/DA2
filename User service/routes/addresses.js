const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController')

router.get('/', addressController.getAllUser)
router.get('/address/:addressId', addressController.getAddressById)
router.get('/:userId/', addressController.getAddressByUserId)
router.post('/create', addressController.createAddress)
router.put('/update/:addressId', addressController.updateAddressById)
router.delete('/delete/:addressId', addressController.deleteAddressById)

module.exports = router