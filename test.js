const { copyFile } = require('fs');

async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  
  const mysql = require('mysql');
  console.log("require com sucesso");
  const connection = await mysql.createConnection("mysql://root:Teste@200.131.17.17:10800/BD_teste");
  console.log("deu certo");
  global.connection = connection;
  return connection;
}

connect();


async function selectUsu(){
    const conn = await connect();
    const rows = await conn.query('SELECT * FROM usu');
    const obj = Object.assign({},rows);
    return obj;
}

module.exports = {selectUsu}


/*
async function selectCustomers() {
    const conn = await connect();
    return await conn.query('SELECT * FROM usu');
}

module.exports = {selectCustomers}

*/

  
