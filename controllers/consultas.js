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

exports.consultateste = async (req, res, next) => {
    //  console.log(req.cookies);
    
        try {
            
            db.query('SELECT * FROM profissional inner join usuario on profissional.id_usuario = usuario.id_usuario', (error, results) => {
                console.log(results);

           

                req.usuprof = results;
                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    }
   


