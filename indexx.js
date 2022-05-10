
(async () => {
    const tt = require("./test");
    console.log('Começou!');
 
    console.log('SELECT * FROM usu');
    const usuarios = await selectUsu();
    console.log(usuarios);
})();
