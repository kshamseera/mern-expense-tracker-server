
//require model
const Expense = require('../models/expense');

// get all expenses
const getAllExpenses = function (user) {
    return Expense.find({"username": user})
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
// update an expense 
const updateExpense = (req) => {
    return Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
};

module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}











