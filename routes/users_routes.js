const express = require('express')
const router = express.Router()

const {removeUser, changeUser} = require('../controllers/users_controller')

router.put('/:id', changeUser)
router.delete('/:id', removeUser)

module.exports = router;