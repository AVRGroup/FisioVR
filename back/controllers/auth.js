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

exports.login = async (req, res) => {

    try {
        const { user, password } = req.body;
        console.log(password);
        console.log(user);

        const config = {
            title: 'FisioVR - Login',
            layout: 'main',
            styleLibs: [{
                href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
                integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
                crossorigin: 'anonymous'
            }],
            navbar: [{ name: 'Cadastro', route: '/cadastro' }],
            user: req.usuario,
            message: ''
        }

        if (!user || !password) {
            config.message = 'Informe um usuário e uma senha!';

            return res.status(400).render('login', config)
        }

        db.query('SELECT * FROM usuario WHERE login = ?', [user], async (error, results) => {
            console.log(results);
            //bcrypt.compare(password, results[0].password)
            config.message = 'usuario ou senha incorretos';
            if (!results || password != results[0].senha /*|| !password.compare(results[0].password)*/) {
                res.status(401).render('login', config);
            } else {
                console.log(results);
                const id = results[0].id_usuario;

                const tipo = results[0].id_tipo_usuario
                console.log("Tipo de usuario" + tipo);
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("aquii: ");
                console.log("Token: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }


                if (tipo == 1) {
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("/cadastro");
                } else if (tipo == 2) {
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("/cadastro");
                } else if (tipo == 3) {
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("/paciente");
                }

            }
        });
    } catch (error) {
        console.log(error);
    }

}

exports.atualizarDados = (req, res) =>{
    const { nome, telefone, senha, confirmarSenha, cpf, email } = req.body;
    console.log(req.body);


}

//acho que é cadastro. verificar campos cadastro. e trocar campos da query's
exports.register = (req, res) => {
    //console.log(req.body);

    const { nome, email, cpf, telefone, user, password, passwordConfirm, opcoes_usu } = req.body;

    db.query('SELECT login FROM usuario WHERE login = ?', [user], async (error, results) => {
        if (error) {
            console.log(error);
        }

        const config = {
            title: 'FisioVR - Cadastro',
            layout: 'main',
            styleLibs: [{
                href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
                integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
                crossorigin: 'anonymous'
            }],
            navbar: [{ name: 'Inicio', route: '/' }],
            message: ''
        }

        if (results.length > 0) {
            config.message = 'Login de usuario já cadastrado!'
            return res.render('cadastro', config)
        } else if (password !== passwordConfirm) {
            config.message = '}Campos de senha não coincidem!'
            return res.render('cadastro', config);
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO usuario SET ?', { id_usuario = default, login: user, senha: password, nome: nome, email: email, cpf: cpf, telefone: telefone, id_tipo_usuario: opcoes_usu}, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                config.message = 'Usuário Cadastrado com Sucesso!'
                return res.render('cadastro', config);
            }
        })

    });



}



exports.isLoggedIn = async (req, res, next) => {
    //  console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //verifica o token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            console.log("aqui123");
            console.log(decoded);
            console.log(decoded.id);
            //verifca se o usuario existe
            db.query('SELECT * FROM usuario WHERE id_usuario = ?', [decoded.id], (error, result) => {
                console.log(result);

                if (!result) {
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
