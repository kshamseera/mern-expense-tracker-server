<<<<<<< HEAD
const{ addExpense } = require('../utils/expense_utilities')

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
    makeExpense
}
=======
const {getAllExpenses, getExpensesById} = require("../utils/expense_utilities");
const { response } = require("express");

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

    module.exports = {
        getExpenses
    }
>>>>>>> 94a2df450f89303fbe7c364535572a7e7eb2c5c5
