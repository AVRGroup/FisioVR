const express = require("express");
import mysql from "mysql2"

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Teste',
    database: 'BD_teste'
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