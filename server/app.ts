// Importing all required libraries
import express from "express"
import cors from "cors"
import dbpool from "./db/db"
import cookieSession from "cookie-session"
import passport from "passport";
require("dotenv").config()


// creating our app using express
const app = express()

// Setting PORT
const PORT = process.env.PORT || 5000;


// Adding required middleware
app.use(cookieSession({
    name: 'authSession',
    keys: ["test-project_mark1@CodingMart$"],
    maxAge: 24*60*60*100
}))

// CORS - Cross Origin Resource Sharing, our Frontend will be running on different port (3000) and our Backend will run of 5000, it so how can frontend access backend, so we need to connect it, thats the reason we are using CORS.
app.use(cors({
    origin: "http://localhost:5173",  //only localhost:3000 can access this server
    credentials: true  //Responding with this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests. 
}))


app.use(passport.initialize())
app.use(passport.session());


//Connecting to MySQL Database
dbpool.getConnection((err:any,connection:any) => {
    if(err)throw err;
    console.log("Connection to database is successful")
})

//Adding Route, "/auth" is going to be prefix for all the routes which are in ./router/auth/passport
app.use('/auth', require('./Routers/auth/passport'));

// Starting our port... 
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
