const Expense = require('../models/expense')

// get all expenses
const getAllExpenses = function () {
    return Expense.find()
}

// get expenses by id
const getExpensesById = function (id) {
    return Expense.findById(id)
}

//

module.exports = {
    getAllExpenses,
    getExpensesById
}