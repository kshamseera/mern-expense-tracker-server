const express = require("express")
const router = express.Router()
const {getExpenses, getExpense, makeExpense, changeExpense, removeExpense} = require("../controllers/expenses_controller")

// READ
// GET on '/transactions'
// Returns all transactions
router.get("/", getExpenses)

//READ
// GET on '/transactions/:id'
// Returns transaction with that id
router.get("/:id", getExpense)

//CREATE
//POST on '/transactions'
//create a new expense
router.post("/", makeExpense)

//Update
//PUT on '/expenses/:id'
//update expense by id
router.put("/:id", changeExpense)

// DELETE
// DELETE on './transactions/:id'
// Deletes the expense with that id
router.delete("/:id", removeExpense)

module.exports = router