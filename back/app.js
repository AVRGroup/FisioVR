const express = require("express");
const exphbs = require('express-handlebars');
const path = require('path');
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


const app = express();

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
console.log(__dirname);

//Parse URL-encode bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cookieParser());

app.engine('hbs', exphbs.engine({
    // defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        stringify(obj) {
            return JSON.stringify(obj);
        }
    }
}));

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error);
    } else
        console.log("MYSQL connected!");
})

//Routes

app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth'))

app.listen("3000", () => {
    console.log("server started port 3000");
})

var dir = path.join(__dirname, 'public');

app.use(express.static(dir));