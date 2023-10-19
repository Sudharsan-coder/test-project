const express =require( "express")
const cors =require( "cors")
const dbPool =require( "./db/db")
const db = require('./models');

require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 5000;

app.use(express.json())
// console.log("started")
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true  
}))
app.use(express.urlencoded({extended: true}))

dbPool.getConnection((err,connection) => {
    if(err)throw err;
    console.log("Connection to Database is Successful")
})

// db.sequelize.sync({alter:true})
// .then(()=> {
//     console.log("re-sync db");
// })
// .catch((err) => {
//     console.log(`Failed To Sync Database: ${err}`);
// });

const userRouter = require('./routes/user.router');
app.use('/api/user', userRouter);

const skillRouter = require('./routes/skill.router');
app.use('/api/skill', skillRouter);

const ratingRouter = require('./routes/rating.router');
app.use('/api/rating', ratingRouter);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
