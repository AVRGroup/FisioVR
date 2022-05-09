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

console.log("ok");

/*app.get("/usuario", (req, res) => {*/
   pool.query("select * from usu", (err, results) => {
   	if (err) sendStatus(500).send(err);
   	else send(results);
   });
   
/*   });  */ 



