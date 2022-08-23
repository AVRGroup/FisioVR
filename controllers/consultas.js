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
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);

        db.query('SELECT * from usuario inner join profissional on usuario.id_usuario = profissional.id_usuario where usuario.id_usuario = ?', [decoded.id], (error, results) => {
   
            const idprof = results[0].id_profissional;
             
            db.query('SELECT * FROM paciente inner join usuario on paciente.id_usuario = usuario.id_usuario where id_prof_resp = ?', [idprof], (error, results) => {
                        
                req.usuprof = results;
                return next();
            });

    });
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.infopaciente = async (req, res, next) => {
    //  console.log(req.cookies);
    const userpac = req.params.userpac;

    try {
 
         db.query('SELECT * FROM usuario join paciente on paciente.id_usuario = usuario.id_usuario where paciente.id_paciente = ?', [userpac], (error, results) => {
             console.log(results);
             req.infopac = results;
             return next();
        });

    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.infolista = async (req, res, next) => {
    //  console.log(req.cookies);
    const userpac = req.params.userpac;
    //console.log(userpac);

    try {

        db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = ? order by l.datahora_envio desc', [userpac], (error, results2) => {
            //console.log(results2);
            req.infolista = results2;
            return next();          
         });
    
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.listaExercicios = async (req, res, next) => {
    try {
        const userpac = req.params.userpac;
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
        console.log(decoded)


        db.query('SELECT * from usuario inner join paciente on usuario.id_usuario = paciente.id_usuario where usuario.id_usuario = ?', [decoded.id], (error, results) => {
   
            const idPaciente = results[0].id_paciente;
             
            db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = ? AND el.status = "AGUARDANDO"', [idPaciente], (error, results) => {
                
                req.lista = results;

                return next();
            });


        /*db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = ? order by l.datahora_envio', [decoded.id], (error, results) => {
            console.log(results);
            console.log("Lista")
            req.lista = results;
            return next();
           */ 
        });
    } catch(error) {
        console.log(error);
        return next();
    }
}

exports.perfilPacientes = async (req, res, next) => {
    //  console.log(req.cookies);

    try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
        //console.log(decoded.id + "decoded.id")
        db.query('SELECT * FROM paciente inner join usuario on paciente.id_usuario = usuario.id_usuario where usuario.id_usuario = ?', [decoded.id], (error, results) => {

            req.perfilPaciente = results[0];
            return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

