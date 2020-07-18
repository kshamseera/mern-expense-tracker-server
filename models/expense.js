const mongoose = require('mongoose');

const Schema = mongoose.Schema
const Expense = new Schema({
    item: {
        type: String,
        required: [true, 'Item is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        required: [true, 'category is required']
    } ,
    notes: {
        type: String,
    } ,

})

module.exports = mongoose.model('Expense', Expense)