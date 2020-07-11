
const {getAllExpenses, getExpensesById, addExpense } = require("../utils/expense_utilities");

const getExpenses = function(req,res) {
    getAllExpenses(req)
        .sort({
                date: -1
        })
        .exec((err, expenses) => {
             if (err) {
                 res.status(500)
                 return res.json({
                     error: err.message
                 })
            }
            res.send(expenses)
        })
    }

    const makeExpense = function (req,res) {
        const date = new Date()
    
        addExpense(req)
        .save((err, expense) =>{
            if(err) {
                res.status(400)
                return res.json({
                    error: err.message
                })
            }
            res.status(201)
            res.send(expense)
        })
    
    }

    module.exports = {
        getExpenses,
        makeExpense
    }

