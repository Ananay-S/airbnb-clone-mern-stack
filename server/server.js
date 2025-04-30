// Require
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Model
const User = require('./models/usersModel.js');

// Routes
const listingsRouter = require("./routes/listingsRoutes.js");
const reviewsRouter = require("./routes/reviewsRoutes.js");
const usersRouter = require("./routes/usersRoutes.js");

// Error related
const ExpressError = require("./utils/ExpressError.js");
const errorHandler = require('./middlewares/errorHandler.js');

// Environment variables
require('dotenv').config();

// Express
const app = express();
const port = 8080;

// Mongoose (JOI validation)
const DB_URL = "mongodb://127.0.0.1:27017/airbnb-clone-test";
const connectDB = async(DB_URL)=>{
    await mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => next(err));
}
connectDB(DB_URL);


// Cors
app.use(cors({
    origin: "http://localhost:5173", // your React frontend URL
    credentials: true, // allow cookies
}));

// Parse 
    // (in-built BodyParser, json req)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (MongoStore)
const secretCode = "secret_code";
const mongoSessionStore = MongoStore.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: secretCode,
    },
    touchAfter: 60*60*24, // in (s)
    // ttl: expiry in (s)
});
mongoSessionStore.on("error", ()=>{
    console.log("Error in mongo session store: ",err);
    next(err);
});
const sessionOptions = {
    store: mongoSessionStore,
    secret : secretCode,
    resave : false,
    saveUninitialized : true,
    cookie : { //(in ms)
        expires : Date.now() + 1000*60*60*24*7, 
        maxAge : 1000*60*60*24*7,
        httpOnly : true,
    },
};
app.use(session(sessionOptions));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Use routes
app.use("/api/listings", listingsRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api/users", usersRouter);

// Handle error
app.all("*", (req,res,next) => {
    return next(new ExpressError(404, "API endpoint not found."));
});
app.use(errorHandler);

// App
app.listen(port, ()=>{
    console.log(`server listening on port: ${port}.`);
});