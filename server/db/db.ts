//importing mysql package so the we can add our database credentials
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

//Configuring credentials
const dbPool = mysql.createPool({
    connectionLimit: 360,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Exporting this file so that we can access this anywhere on our server by importing it.
export default dbPool;