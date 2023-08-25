//importing mysql package so the we can add our database credentials
import mysql from 'mysql';

//Configuring credentials
const db = mysql.createPool({
    connectionLimit: 360,
    host: "localhost",
    user: "root",
    password: "Yokesh@mysql1",
    database: "test_db"
});

//Exporting this file so that we can access this anywhere on our server by importing it.
export default db;
