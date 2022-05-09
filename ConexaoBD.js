const mysql = require('mysql');
const connection = mysql.createConnection({
	host: '200.131.17.17',
	port: 11062,
	user: 'root',
	password: 'Teste',
	database:'BD_teste'
});

connection.connect(function(erro){
 if(erro) return console.log(erro); 
 console.log('conectou!');
 })


  
