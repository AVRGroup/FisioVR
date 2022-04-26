console.log("ssssss");
async () => {
    const db = require("./test");
    console.log("Conectou!");
    console.log('SELECT * FROM USUARIO');
    const clients = await db.selectCustomers();
    console.log(clients);
};
