const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/', userController.getAllUser)
router.get('/:userId', userController.getUserById)
router.post('/create', userController.createUser)
router.post('/login/account/', userController.loginByAccount)
router.put('/update/:userId', userController.updateUserById)
router.delete('/delete/:userId', userController.deleteUserById)

module.exports = router