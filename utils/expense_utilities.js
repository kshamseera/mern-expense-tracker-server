//reuire model
const Expense = require('../models/Expense');

//add a new expense
const addExpense = (req) => {
    let date = Date.now();
    req.body.date = date;
    return new Expense(req.body)
};


module.exports = {
    addExpense
}