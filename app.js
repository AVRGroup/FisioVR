const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const dotenv = require("dotenv");

const app = express();

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
console.log(__dirname);

app.set('view engine', 'hbs');

db.connect(  (error) => {
    if(error) {
        console.log(error);
    } else
        console.log("MYSQL connected!");
} )

//Routes

app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth'))

app.listen("3000", () => {
    console.log("server started port 3000");
})