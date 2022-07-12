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
        const { usuario } = req.body;
        console.log(usuario);
        db.query('SELECT * FROM paciente inner join usuario on paciente.id_usuario = usuario.id_usuario where id_prof_resp = ?', [usuario], (error, results) => {
            console.log(results);

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
            console.log(results + "lista");

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
            console.log(results + "paciente");

            req.perfilPaciente = results;
            return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}


