//importing mysql package so the we can add our database credentials
import mysql from 'mysql';

//Configuring credentials
const dbpool = mysql.createPool({
    connectionLimit: 360,
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Exporting this file so that we can access this anywhere on our server by importing it.
export default dbpool;
// module.exports = db;