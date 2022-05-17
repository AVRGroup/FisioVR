const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
console.log(__dirname);

db.connect(  (error) => {
    if(error) {
        console.log(error);
    } else
        console.log("MYSQL connected!");
} )

const app = express();

app.get("/", (req, res) => {
    // por default, ele procura o arquivo .hbs
    res.render("index");
})

app.listen("3000", () => {
    console.log("server started port 3000");
})