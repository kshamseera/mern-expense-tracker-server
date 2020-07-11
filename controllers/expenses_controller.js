
const {getAllExpenses, getExpenseById, addExpense, updateExpense, deleteExpense} = require("../utils/expense_utilities");

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

const getExpense = function(req,res){
    getExpenseById(req.params.id)
        .exec((err, expense) => {
            if (err || !expense) {
                req.status = 404;
                return res.send("Expense not found")  
            }
            res.send(expense)
    })
}

const makeExpense = function (req,res) {
    
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

    const changeExpense = function(req,res) {
        // Check for error from middleware
        // execute the query from updateExpense
        updateExpense(req)
        .exec((err, expense) => {
            if(err || !expense) {
                req.message = err ? err.message : 'Expense details not found';
                req.status = err ? 500 : 400
            }
            res.status(200)
            res.send(expense)
        })
    }

const removeExpense = function(req,res){
    deleteExpense(req.params.id)
        .exec((err) => {
            if (err) {
                res.status=404
                return res.send("Expense not found")
            }
            res.status=204
            res.send("Deleted Successfully")
        })
}

    module.exports = {
        getExpenses,
        getExpense,
        makeExpense,
        changeExpense,
        removeExpense
    }

