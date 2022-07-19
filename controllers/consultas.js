const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const { promisify } = require("util");
const { AsyncLocalStorage } = require("async_hooks");
const { restart } = require("nodemon");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

/*
const express = require("express");
const app = express();
var bodyParser = require('body-parser')

var urlencondedParser = bodyParser.urlencoded({extended: false})

app.use(bodyParser.urlencoded({extended: false}))

app.post('/meuspacientes', urlencondedParser, function(req, res){
    var idusu = req.body.usuario
});

/*
exports.consultateste = async (req, res) => {

    try {

        db.query('SELECT * FROM profissional join usuario in profissional.id_usuario = usuario.id_usuario', async (error, results)=>{
            console.log(results);
            
            req.usuprof = results;
    } catch (error) {
        console.log(error);
    }

}

}
*/

exports.consultapacientes = async (req, res, next) => {
    //  console.log(req.cookies);

    try {
        //const { testeusu } = req.body;
        console.log("testandoooaqui");
        console.log("consultando req body:" + req.body.usuario);
        console.log("consultando req query:" + req.query.usuario);
        console.log("consultando req query 1:" + req.query.nome);
        console.log("consultando req query 1:" + req.query.id_usuario);
        const { teste1 } = req.body;
        console.log("teste1 aqui:" + teste1);
        db.query('SELECT * FROM paciente inner join usuario on paciente.id_usuario = usuario.id_usuario where id_prof_resp = 1', (error, results) => {
            //console.log(results);

            req.usuprof = results;
            return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.pacientes = async (req, res, next) => {
    //  console.log(req.cookies);

    try {

        db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = 1 order by l.datahora_envio', (error, results) => {
            console.log(results);
            console.log("Lista")
            req.lista = results;
            return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.perfilPacientes = async (req, res, next) => {
    //  console.log(req.cookies);

    try {

        db.query('SELECT * FROM paciente inner join usuario on paciente.id_usuario = usuario.id_usuario where id_paciente = 1', (error, results) => {
            console.log(results);
            console.log("results do perfilPacientes")
            req.perfilPaciente = results;
            return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}


