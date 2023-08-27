import express from "express"
import cors from "cors"
import dbPool from "./db/db"
import cookieSession from "cookie-session"
import passport from "passport";
const db = require('./models');

require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 5000;

app.use(express.json())

const userRouter = require('./routes/user.router');
app.use('/api/user', userRouter);

app.use(cookieSession({
    name: 'authSession',
    keys: ["test-project_mark1@CodingMart$"],
    maxAge: 30*60*100
}))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true  
}))
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session());

dbPool.getConnection((err:any,connection:any) => {
    if(err)throw err;
    console.log("Connection to Database is Successful")
})

db.sequelize.sync({alter:true})
    .then(()=> {
        console.log("re-sync db");
})
    .catch((err:any) => {
        console.log(`Failed To Sync Database: ${err}`);
});

app.use('/auth', require('./auth/passport'));

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
