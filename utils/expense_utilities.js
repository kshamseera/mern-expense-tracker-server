
//reuire model
const Expense = require('../models/expense');

// get all expenses
const getAllExpenses = function () {
    return Expense.find()
}
// get expenses by id
const getExpensesById = function (id) {
    return Expense.findById(id)
}

//add a new expense
const addExpense = (req) => {
    let date = Date.now();
    req.body.date = date;
    return new Expense(req.body)
};


module.exports = {
    addExpense,
    getAllExpenses,
    getExpensesById
}











