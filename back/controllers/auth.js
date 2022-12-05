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
            navbar: [{}],
            user: req.usuario,
            message: ''
        }

        if (!user || !password) {
            config.message = 'Informe um usuário e uma senha!';

            return res.status(400).render('login', config)
        }

        db.query('SELECT * FROM usuario WHERE login = ?', [user], async (error, results) => {
            if (results.length <= 0) {
                config.message = 'usuario ou senha incorretos';
                res.status(401).render('login', config);
            } else {
                console.log(results);
                const id = results[0].id_usuario;

                const tipo = results[0].id_tipo_usuario
                console.log("Tipo de usuario" + tipo);
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("Login: ");
                console.log("Token: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }


                if (tipo == 1) {
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("/adm_profile");
                } else if (tipo == 2) {
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("/profissional_profile");
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

exports.atualizarDados = (req, res) => {
    const { nome, telefone, senha, confirmarSenha, cpf, email } = req.body;
    console.log(req.body);


}

function trataCPf(auxCpf){
    //tratando tirando a máscrada do campo de cpf
    if (auxCpf) {
        auxCpf=auxCpf.replace("-", "");
        auxCpf=auxCpf.replaceAll('.','');
    }
    return auxCpf;
}

function trataTelefone(auxTelefone){
    //tirando a máscara do campo de telefone
    if (auxTelefone) {
        auxTelefone=auxTelefone.replace("(", "");
        auxTelefone=auxTelefone.replace(")", "");
        auxTelefone=auxTelefone.replace("-","");
    }
    return auxTelefone;
}

//acho que é cadastro. verificar campos cadastro. e trocar campos da query's
exports.register = (req, res) => {
    //console.log(req.body);

    const { nome, email, cpf, telefone, user, password, passwordConfirm, descProblema,idProfissional, tipoUsuarioCadastrando} = req.body;
    //console.log("Teste id tipo cadastro "+tipoUsuarioCadastrando);

    const cpfTradado = trataCPf(cpf);
    const telefoneTratado = trataTelefone(telefone)
    db.query('SELECT login FROM usuario WHERE login = ?', [user], async (error, results) => {

        try {
            const config = {
                title: 'FisioVR - Login',
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
                return res.render('cadastro', config);
            } else if (password !== passwordConfirm) {
                config.message = 'Campos de senha não coincidem!'
                return res.render('cadastro', config);
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            // 'teste', 'teste', 'teste', 'teste@gmail.com', 12876787465, 32991878776, 2

            db.query('INSERT INTO usuario (login, senha, nome, email, cpf, telefone, id_tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)', [user, password, nome, email, cpfTradado, telefoneTratado, 3], (error1, results) => {
                try {
                    db.query('SELECT MAX(id_usuario) as id_usuario from usuario;', async (error2, results1) => {
                        try{
                            //console.log(results1[0].id_usuario); 
                            const idUsuario  = results1[0].id_usuario;
                            db.query('INSERT INTO paciente (id_usuario, id_prof_resp, desc_problema) VALUES (?, ?, ?)', [idUsuario, idProfissional, descProblema], (error3, results) => {
                                try{

                                    console.log(results);
                                    config.message = 'Usuário Cadastrado com Sucesso!';
                                    if(tipoUsuarioCadastrando==1){
                                        console.log("Cadastrado por administrador");
                                        return res.redirect('/adm_profile');
                                    }else if(tipoUsuarioCadastrando == 2){
                                        console.log("Cadastrado por profissional");
                                        return res.redirect('/profissional_profile');
                                    }
                                }catch(error3){
                                    console.log("Erro na inserção paciente"+error3);
                                }
                            });

                        }catch(error2){
                            console.log(error2);
                        }
                    });
                    
                }
                catch (error1) {
                    config.message = "Erro ao cadastrar o usuário."
                    console.log(error1);
                    return res.render('cadastro', config);
                }
            });
        }
        catch (error) {
            console.log(error);
            config.message = "Erro ao consultar."
        }

    });
    
}

exports.cadastroProfissional= (req, res) => {
    const { nome, email, cpf, telefone, user, password, passwordConfirm, crm } = req.body;

    const cpfTradado = trataCPf(cpf);
    const telefoneTratado = trataTelefone(telefone)
    db.query('SELECT login FROM usuario WHERE login = ?', [user], async (error, results) => {

        try {
            const config = {
                title: 'FisioVR - Login',
                layout: 'main',
                styleLibs: [{
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
                    integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
                    crossorigin: 'anonymous'
                }],
                navbar: [{ name: 'Inicio', route: '/' }, { name: 'Profissional', route: '/cadastroProfissional' }, { name: 'Administrador', route: '/cadastroAdministrador' }],
                tipos_usu: req.tiposusuario,
                message: ''
            }

            if (results.length > 0) {
                config.message = 'Login de usuario já cadastrado!'
                return res.render('cadastroProfissional', config);
            } else if (password !== passwordConfirm) {
                config.message = 'Campos de senha não coincidem!'
                return res.render('cadastroProfissional', config);
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            // 'teste', 'teste', 'teste', 'teste@gmail.com', 12876787465, 32991878776, 2

            db.query('INSERT INTO usuario (login, senha, nome, email, cpf, telefone, id_tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)', [user, password, nome, email, cpfTradado, telefoneTratado, 2], (error1, results) => {
                try {
                    db.query('SELECT MAX(id_usuario) as id_usuario from usuario;', async (error2, results1) => {
                        try{
                            //console.log(results1[0].id_usuario); 
                            const idUsuario  = results1[0].id_usuario;
                            db.query('INSERT INTO profissional (crm,id_usuario) VALUES (?, ?)', [crm, idUsuario], (error3, results) => {
                                try{
                                    //console.log(results);
                                    config.message = 'Usuário cadastrado com Sucesso!';
                                    //alert("Usuário cadastrado com sucesso!");
                                    console.log('Usuário Cadastrado com Sucesso!');
                                    return res.redirect('/adm_profile');

                                }catch(error3){
                                    console.log("Erro na inserção profissinal"+error3);
                                }
                            });

                        }catch(error2){
                            console.log(error2);
                        }
                    });
                    
                }
                catch (error1) {
                    config.message = "Erro ao cadastrar o usuário."
                    console.log(error1);
                    //alert("Erro ao cadastrar");
                    return res.render('cadastroProfissional', config);
                }
            });
        }
        catch (error) {
            console.log(error);
            config.message = "Erro ao consultar."
        }

    });
}
exports.cadastroAdministrador= (req, res) => {
    const { nome, email, cpf, telefone, user, password, passwordConfirm, crm } = req.body;

    const cpfTradado = trataCPf(cpf);
    const telefoneTratado = trataTelefone(telefone)
    db.query('SELECT login FROM usuario WHERE login = ?', [user], async (error, results) => {

        try {
            const config = {
                title: 'FisioVR - Login',
                layout: 'main',
                styleLibs: [{
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
                    integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
                    crossorigin: 'anonymous'
                }],
                navbar: [{ name: 'Inicio', route: '/' }, { name: 'Profissional', route: '/cadastroProfissional' }, { name: 'Administrador', route: '/cadastroAdministrador' }],
                tipos_usu: req.tiposusuario,
                message: ''
            }

            if (results.length > 0) {
                config.message = 'Login de usuario já cadastrado!'
                return res.render('cadastroProfissional', config);
            } else if (password !== passwordConfirm) {
                config.message = 'Campos de senha não coincidem!'
                return res.render('cadastroProfissional', config);
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            // 'teste', 'teste', 'teste', 'teste@gmail.com', 12876787465, 32991878776, 2

            db.query('INSERT INTO usuario (login, senha, nome, email, cpf, telefone, id_tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)', [user, password, nome, email, cpfTradado, telefoneTratado, 1], (error1, results) => {
                try {
                    //console.log(results);
                    config.message = 'Usuário cadastrado com Sucesso!';
                    //alert("Usuário cadastrado com sucesso!");
                    console.log('Usuário Cadastrado com Sucesso!');
                    return res.redirect('/adm_profile');
                    
                }
                catch (error1) {
                    config.message = "Erro ao cadastrar o usuário."
                    console.log(error1);
                    //alert("Erro ao cadastrar");
                    return res.render('cadastroProfissional', config);
                }
            });
        }
        catch (error) {
            console.log(error);
            config.message = "Erro ao consultar."
        }

    });
}






exports.isLoggedIn = async (req, res, next) => {
    //  console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //verifica o token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            //console.log("aqui123");
            //console.log(decoded);
            //console.log(decoded.id);
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
