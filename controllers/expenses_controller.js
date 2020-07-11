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