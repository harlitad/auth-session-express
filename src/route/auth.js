const { authController } = require("../controller/authController");
const express = require('express')
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = {
    routerAuth : router
}