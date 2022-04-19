const Sequelize = require('sequelize');
const sequelize = new Sequelize('hcode', 'root', 'Teste', {
    host: "localhost",
    dialect: 'mysql'
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