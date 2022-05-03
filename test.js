const { copyFile } = require('fs');

async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  
  var mysql = require('mysql');
  console.log("require com sucesso");
  var connection = await mysql.createConnection({
  	host: "fisiovr@200.131.17.17",
  	port: 10800,
  	user: "root",
  	password: "Teste",
  	database: "BD_Teste"
  });
  console.log("deu certo amem amem");
  return connection;
}
connect();

async function selectCustomers() {
    const conn = await connect();
    return await conn.query('SELECT * FROM USUARIO');
}

module.exports = {selectCustomers}



  
