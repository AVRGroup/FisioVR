const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const { promisify } = require("util");
const { AsyncLocalStorage } = require("async_hooks");
const { restart } = require("nodemon");
const nodemailer = require("nodemailer");

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
                if(user === results[0].login && password === results[0].senha){

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
                else{
                    config.message = 'usuario ou senha incorretos';
                    res.status(401).render('login', config);
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
    console.log("Dados a serem cadastrados: ");
    console.log(req.body);
    
    let auxIdProfissional;
    const cpfTradado = trataCPf(cpf);
    const telefoneTratado = trataTelefone(telefone)
    try {
        db.query('SELECT login FROM usuario WHERE login = ?', [user], async (error, results) => {

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
            try{
                db.query('SELECT id_profissional FROM profissional WHERE id_usuario = ?', [idProfissional], async (error, result) => {
                    auxIdProfissional = result[0].id_profissional
                });
            }catch(error){
                console.log("Erro na inserção paciente"+error);
            }

            try {
                db.query('INSERT INTO usuario (login, senha, nome, email, cpf, telefone, id_tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)', [user, password, nome, email, cpfTradado, telefoneTratado, 3], (error1, results) => {
                    try{
                        db.query('SELECT MAX(id_usuario) as id_usuario from usuario;', async (error2, results2) => {
                                //console.log(results1[0].id_usuario); 
                                const idUsuario  = results2[0].id_usuario;
                                try{
                                    db.query('INSERT INTO paciente (id_usuario, id_prof_resp, desc_problema) VALUES (?, ?, ?)', [idUsuario, auxIdProfissional, descProblema], (error3, results3) => {

                                        //console.log(results3);
                                        if(tipoUsuarioCadastrando==1){
                                            console.log("Cadastrado por administrador");
                                            return res.redirect('/adm_profile');
                                        }else if(tipoUsuarioCadastrando == 2){
                                            console.log("Cadastrado por profissional");
                                            return res.redirect('/profissional_profile');
                                        }else{
                                            return res.redirect('/');
                                        }
                                    });
                                }catch(error3){
                                    console.log("Erro na inserção paciente"+error3);
                                }

                        });
                    }catch(error2){
                        console.log("Problema no cadastro do paciente");
                        console.log(error2);
                    }
                    
                });
            }catch (error1) {
                console.log("Erro ao cadastrar o usuário.");
                config.message = "Erro ao cadastrar o usuário."
                console.log(error1);
                //return res.render('cadastro', config);
            }
        });
    }catch (error) {
        console.log(error);
        config.message = "Erro ao consultar."
    }

    
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
exports.novoExericio = (req, res) => {
    const { exercicio, numExec, anguloBase, anguloAlvo, tempoExec, idUsuario, idPaciente, emailPaciente } = req.body;
    let idProfissional;
    var idExercicio = exercicio.split('--')[0];
    
    console.log("ID PACIENTE: "+ idPaciente);    
    
    try{
        db.query('SELECT id_profissional FROM profissional WHERE id_usuario = ?', [idUsuario], async (error, results) => {
            idProfissional = results[0].id_profissional;
    
        try {
        db.query('INSERT INTO lista (id_profis_responsavel, id_paciente) VALUES (?, ?)', [idProfissional, idPaciente], (error, results2) => {
            try{
                db.query('SELECT MAX(id_lista) as id_lista from lista;', async (error2, results3) => {
                    var id_lista = results3[0].id_lista;
                    try{
                        db.query('INSERT INTO exercicios_lista (id_lista, id_exercicio, num_execucoes, angulos_concentricos, status, tempo_execucao, angulos_excentricos) VALUES (?,?,?,?,?,?,?)', [id_lista, idExercicio, numExec, anguloAlvo,"Pendente",tempoExec,anguloBase], (error3,results) => {
                            //config.message = "Exercício enviado com sucesso!."
                            //alert("Erro ao cadastrar");
                            console.log("Exercício receitado com sucesso!")
                            const transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 587,
                                secure: false,
                                auth: {
                                    user: process.env.EMAIL_USER,
                                    pass: process.env.EMAIL_PASS
                                }
                            });

                            const email = {
                                from: process.env.EMAIL_USER,
                                to: emailPaciente,
                                subject: 'Novo exercício!',
                                text: 'Seu médico enviou um novo exercício.\nEntre no seu perfil para verificar.'
                            }

                            transporter.sendMail(email, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                else{
                                    console.log("Email enviado com sucesso.");
                                }

                            });
                            
                            return res.redirect('./profissional_profile');
                        });
                    }catch (error3) {
                        console.log(error3);
                        config.message = "Erro ao inserir exercicio lista."
                        return res.redirect('./profissional_profile');
                    }
                });
            }catch (error2) {
                console.log(error);
                config.message = "Erro ao consultar id lista."
            }
        });
        
        }catch (error) {
            console.log(error);
            config.message = "Erro ao inserir lista."
        }
    
    });
    }catch (erro) {
        console.log(erro);
        config.message = "Erro buscar por id profissional."
    }

}

exports.editarexercicio = (req, res) => {
    const { numExec, anguloBase, anguloAlvo, tempoExec, idexelist, emailPaciente } = req.body;
    nexe = parseInt(numExec);
    id = parseInt(typeof idexelist);
    try {
        db.query('UPDATE `exercicios_lista` SET `num_execucoes` = ?, `angulos_concentricos` = ?, `tempo_execucao` = ?, `angulos_excentricos` = ? where `id_exercicios_lista` = ?', [numExec, anguloBase, tempoExec, anguloAlvo, idexelist], (error, results) => {
            console.log("Exercício editado com sucesso!")

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const email = {
                from: process.env.EMAIL_USER,
                to: emailPaciente,
                subject: 'Exercício editado.',
                text: 'Seu médico fez uma alteração nos seus exercícios.\nEntre no seu perfil para verificar.'
            }

            transporter.sendMail(email, (err) => {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("Email enviado com sucesso.");
                }

            });

            return res.redirect('./profissional_profile');
        });
    } catch (error) {
        console.log(error);
        config.message = "Erro ao editar exercicio."
    }
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
                console.log("Verifica se usuario esta logado");

                if (!result) {
                    console.log("Problema coleta edição perfil");
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
