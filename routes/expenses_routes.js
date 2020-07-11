const express = require("express")
const router = express.Router()
const {getExpenses} = require("../controllers/expenses_controller")

// READ
// GET on '/transactions'
// Returns all transactions
router.get("/", getExpenses)

//READ
// GET on '/transactions/:id'
// Returns transaction with that id
router.get("/:id", getExpenses)

module.exports = router