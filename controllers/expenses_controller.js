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
