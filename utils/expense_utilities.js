
//require model
const Expense = require('../models/expense');

// get all expenses
const getAllExpenses = function () {
    return Expense.find()
}
// get expense by id
const getExpenseById = function (id) {
    return Expense.findById(id)
}

//add a new expense
const addExpense = (req) => {
    return new Expense(req.body)
};

// delete an expense instance
const deleteExpense = function(id){
    return Expense.findByIdAndRemove(id)
}


module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    deleteExpense
}











