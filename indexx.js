async function selectUsu(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usu');
    return rows;
}

(async () => {
    const tt = require("./test");
    console.log('Começou!');
 
    console.log('SELECT * FROM usu');
    const usuarios = await selectUsu();
    console.log(usuarios);
})();
