const mysql = require('mysql');
var express = require("express");
var app =  express();


const pool = mysql.createPool({
	host: '200.131.17.17',
	port: 10800,
	user: 'root',
	password: 'Teste',
	database:'BD_teste'
});

app.get("/usuario", (req, res) => {
   pool.quey("select * from USUARIO", (err, results) => {
   	if (err) res.sendStatus(500).send(err);
   	else res.send(results);
   });
   console.log("ok");
}); 



