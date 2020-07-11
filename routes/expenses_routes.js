const express = require("express")
const router = express.Router()
const {getExpenses,makeExpense} = require("../controllers/expenses_controller")



// READ
// GET on '/transactions'
// Returns all transactions
router.get("/", getExpenses)

//READ
// GET on '/transactions/:id'
// Returns transaction with that id
router.get("/:id", getExpenses)

//CREATE
//POSt on '/transactions'
//create a new expense
router.post("/", makeExpense)



module.exports = router