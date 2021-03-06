const mongoose = require('mongoose');
const expect = require('expect');
const utilities = require('../utils/expense_utilities');
const Expense = require('../models/expense');
const {
    connectToDb,
    disconnectFromDb
} = require('./config');


let expenseId = null;


// Use done to deal with asynchronous code - done is called when the hooks completes
before((done) => {
    // Connect to the database (same as we do in app.js)
    connectToDb(done);
});

after((done) => {
    disconnectFromDb(done);
})

// Set up test data before each test
beforeEach(async function () {
    // Load a test record in setupData
    // Use await so we can access the expenseId, which is used by some tests
    let expense = await setupData();
    expenseId = expense._id;
});

// Delete test data after each test
afterEach((done) => {
    // Execute the deleteMany query
    tearDownData().exec(() => done());
});

describe('getAllexpenses with one expense', (done) => {
    it('should get a expense if one exists', function (done) {
        let username = 'tester'
    
        utilities.getAllExpenses(username).exec((err, expenses) => {
            expect(Object.keys(expenses).length).toBe(1);
            done();
        });
    });
    it('username of first expense should be tester', async function () {
        let username = 'tester'
        await utilities.getAllExpenses(username).exec((err, expenses) => {
            expect(expenses[0].username).toBe('tester');
        });

    });
});

describe('getExpenseById', (done) => {
    it('username of first expense should be tester', function (done) {
        // Set up req with postId
        utilities.getExpenseById(expenseId).exec((err, expense) => {
            expect(expense.username).toBe('tester');
            done();
        });
    });
});

// addExpense
describe('addExpense', (done) => {
    it('should add a expense', function (done) {
        // define a req object with expected structure
        const req = {
            body: {
                username: 'tester',
                item: 'milk',
                category: 'food',
                date: new Date('7/12/2020'),
                amount:'10',
                notes: ''
            }
        }
        utilities.addExpense(req).save((err, expense) => {
            expect(expense.item).toBe(req.body.item);
            done();
        });
    });
    it('should fail if a required field is missing', function (done) {
        // define a req object with missing required field (username)
        const req = {
            body: {
                category: 'food',
                amount:'10',
                notes: '' 
            }
        }
        utilities.addExpense(req).save((err, expense) => {
            if (err) {
                expect(err.message).toMatch(/validation/);
                done();
            } else {
                expect(true).toBe(false);
                done();
            }
        });
    });
});

// deleteExpense
describe('deleteExpense', (done) => {
    it('should delete the specified expense', function (done) {
        utilities.deleteExpense(expenseId).exec(() => {
            Expense.findById(expenseId).exec((err, expense) => {
                expect(expense).toBe(null);
                done();
            });
        });
    });
});

// updatePost
describe('updateExpense', (done) => {
    it('should update a expense', function (done) {
        // set up a req object
        const req = {
            params: {
                id: expenseId
            },
            body: {
                item: 'egg',
                username: 'tester',
                category: 'food',
                date: new Date('7/12/2020'),
                amount:'10',
                notes: '' 
            }
        };
        utilities.updateExpense(req).exec((err, expense) => {
            expect(expense.item).toBe(req.body.item);
            done();
        });
    });
});



// Setup and tear down functions
function setupData() {
    let testExpense = {};
    testExpense.username = 'tester',
    testExpense.item = 'milk';
    testExpense.category = 'food';
    testExpense.date = new Date('7/13/2020')
    testExpense.amount = '10';
    testExpense.notes = '';
    return Expense.create(testExpense);
}

function tearDownData() {
    return Expense.deleteMany();
}