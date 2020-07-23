const express = require('express')
const router = express.Router()

const {register, login ,logout, authenticatedUser} = require('../controllers/auth_controller')
const {userAuthenticated} = require('../controllers/expenses_controller')

router.post("/register", register)
router.post("/login", login)
router.get("/logout",logout)

router.get("/user", userAuthenticated, authenticatedUser)

module.exports = router