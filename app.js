const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const expenseRouter = require("./routes/expenses_routes")


const port = process.env.PORT || 3000

const app = express()
// If we are not running in production, load our local .env
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }

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
// Install middleware
const allowList = ['http://localhost:3000','https://obscure-basin-70004.herokuapp.com/']
const corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
        const allowListIndex = allowList.findIndex((url) => url.includes(origin));
        callback(null, allowListIndex > -1)
    }
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use("/expenses", expenseRouter)
app.get("/",(req,res)=> {
    console.log("request on/")
    res.send("Got your request")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

