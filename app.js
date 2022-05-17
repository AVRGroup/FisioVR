const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect(  (error) => {
    if(error) {
        console.log(error);
    } else
        console.log("MYSQL connected!");
} )

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
})

app.listen("3000", () => {
    console.log("server started port 3000");
})