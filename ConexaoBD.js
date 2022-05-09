const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'fisiovr@200.131.17.17',
	port: 10800,
	user: 'root',
	password: 'Teste',
	database:'BD_Teste'
});

connection.connect(function(err){
 if(err) return console.log(err); 
 console.log('conectou!');
 })


  
