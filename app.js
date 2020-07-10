const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const expenseRouter = require("./routes/expenses_routes")


const port = process.env.port || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())

const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/expense_tracker_app'

mongoose.connect(dbConn, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
},
(err) => {
    if (err) {
        console.log("Error connecting to database", err);
    }
    else {
        console.log('Connected to database', dbConn)
    }
});

app.use("/transactions", expenseRouter)
app.get("/",(req,res)=> {console.log("request on/")})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

