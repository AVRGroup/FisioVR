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
	
function createTable(conn){
 
      const sql = "create table teste("+
			"id_usuario int primary key not null,"+
			"nome varchar(60) not null,"+
			"cpf int not null"+
			");";

      pool.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela!');
      });
}

pool.getConnection(function(err, connection) {
  // Use the connection
  createTable(connection);
  pool.query( 'SELECT * FROM usu', function(err, rows) {
    // And done with the connection.
   // connection.release();

    // Don't use the connection here, it has been returned to the pool.
   // console.log(rows['login']);
  });
});

/*app.get("/usuario", (req, res) => {
   pool.query("select * from usu", (err, results) => {
   	if (err) sendStatus(500).send(err);
   	else send(results);
   });
   
/*   });  */ 



