

async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  
  var mysql = require('mysql2/promise');
  var connection = await mysql.createConnection("mysql://root:fisiovr@200.131.17.17:10800/BD_teste");
  console.log("deu certo amem amem");
  return connection;
}
connect();
/*
async function selectCustomers() {
    const conn = await connect();
    return await = conn.query('SELECT * FROM profissional');
}
*/
module.exports = {}
