(async () => {
    const db = require("./test");
    console.log("Conectou!");
    console.log('SELECT * FROM usu');
    const clients = await db.selectCustomers();
      console.log(clients);
}) ();
