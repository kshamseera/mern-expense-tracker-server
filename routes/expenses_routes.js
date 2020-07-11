const express = require("express")
const router = express.Router()

const {makeExpense} = require('../controllers/expenses_controller')

//CREATE
//POSt on '/transactions'
//create a new expense
router.post("/", makeExpense)


module.exports = router