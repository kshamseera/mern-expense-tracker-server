const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session = require('express-session')
const MongoStore = require("connect-mongo")(session)
const passport = require("passport")
const expenseRouter = require("./routes/expenses_routes")
const userRouter = require('./routes/users_routes')
const authRouter = require('./routes/auth_routes')


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
const allowList = ['http://localhost:3001','https://nifty-wright-11dd4b.netlify.app/']
const corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
        const allowListIndex = allowList.findIndex((url) => url.includes(origin));
        callback(null, allowListIndex > -1)
    }
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(session({
    // resave and saveUninitialized set to false for deprecation warnings
    secret: "Express is awesome",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=> {
    console.log("request on/")
    console.log('req.session', req.session)
    res.send("Got your request")
})

app.use("/expenses", expenseRouter)
app.use("/users", userRouter)
app.use("/auth", authRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

