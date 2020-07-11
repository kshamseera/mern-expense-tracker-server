const express = require("express")
const router = express.Router()
const {getExpenses,makeExpense, changeExpense} = require("../controllers/expenses_controller")



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

//Update
//PUT on '/expenses/:id'
//update expense by id
router.put("/:id", changeExpense)




module.exports = router