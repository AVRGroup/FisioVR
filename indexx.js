(async () => {
    const db = require("./test");
    console.log('Começou!');
 
    console.log('SELECT * FROM usu');
    const usuarios = await db.selectUsu();
    console.log(usuarios);
})();
