"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importing mysql package so the we can add our database credentials
var mysql = require('mysql2');
var dotenv = require('dotenv');
dotenv.config();
//Configuring credentials
var dbPool = mysql.createPool({
    connectionLimit: 360,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
//Exporting this file so that we can access this anywhere on our server by importing it.
module.exports = dbPool;
