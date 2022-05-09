const Sequelize = require('sequelize');
const sequelize = new Sequelize( {
    database: 'BD_Teste',
    username: 'root',
    password: 'Teste',
    host: 'fisiovr@200.131.17.17',
    dialect: "mysql",
    port: 10800
});

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro);
});

/*
sequelize.authenticate().then(fucntion(){
    console.log("Conectado com sucesso!");
}).catch(function(erro){
    console.log("Falha ao conectar: " + erro);
});*/
