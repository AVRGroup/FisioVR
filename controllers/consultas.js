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

exports.consultateste = async (req, res) => {

    try {

        db.query('SELECT * FROM profissional join usuario in profissional.id_usuario = usuario.id_usuario', async (error, results)=>{
            console.log(results);
            
            req.usuprof = results;
    } catch (error) {
        console.log(error);
    }

}


//acho que é cadastro. verificar campos cadastro. e trocar campos da query's
exports.register = (req, res) => {
    console.log(req.body);

    const { user, password, passwordConfirm } = req.body;

    db.query('SELECT login FROM usu WHERE login = ?', [user], async (error, results) => {
        if(error) {
            console.log(error);
        }

        if(results.length > 0) {
            return res.render('cadastro', {
                message: 'Usuario pronto'
            })
        } else if(password !== passwordConfirm) {
            return res.render('cadastro', {
                message: 'Senhas diferentes'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO usuario SET ?', {login: user, senha: password }, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('cadastro', {
                    message: 'Usuário Cadastrado'
                })
            }
        })

    });



}

exports.isLoggedIn = async (req, res, next) => {
    //  console.log(req.cookies);
    if(req.cookies.jwt) {
        try {
            //verifica o token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET
                );
            console.log("aqui123");
            console.log(decoded);
            console.log(decoded.id);
            //verifca se o usuario existe
            db.query('SELECT * FROM usuario WHERE id_usuario = ?', [decoded.id], (error, result) => {
                console.log(result);

                if(!result) {
                    console.log("entrou");	
                    return next();
                }

                req.usuario = result[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    }
    else {
        next();
    }

}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });

    res.status(200).redirect('/');
}
