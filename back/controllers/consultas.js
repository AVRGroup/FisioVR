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
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

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

exports.consultapaccadastrados = async (req, res, next) => {
    //  console.log(req.cookies);
    try {

            db.query('SELECT * FROM paciente inner join usuario on paciente.id_usuario = usuario.id_usuario', (error, results) => {

                req.paccad = results;
                return next();
            });

    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.consultaprofcadastrados = async (req, res, next) => {
    //  console.log(req.cookies);
    
    db.query('SELECT * FROM profissional inner join usuario on profissional.id_usuario = usuario.id_usuario', (error, results) => {
        try { 
                req.profcad = results;
                return next();
                
            } catch (error) {
                console.log(error);
                return next();
            }
    });
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

exports.listaExerciciosPendentes = async (req, res, next) => {
    try {
        const userpac = req.params.userpac;
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        // console.log(decoded)


        db.query('SELECT * from usuario inner join paciente on usuario.id_usuario = paciente.id_usuario where usuario.id_usuario = ?', [decoded.id], (error, results) => {

            const idPaciente = results[0].id_paciente;

            db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = ? AND el.status = "Pendente" order by l.datahora_envio', [idPaciente], (error, results) => {

                req.listaP = results;

                return next();
            });


            /*db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = ? order by l.datahora_envio', [decoded.id], (error, results) => {
                console.log(results);
                console.log("Lista")
                req.lista = results;
                return next();
               */
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.listaExerciciosConcluidos = async (req, res, next) => {
    try {
        const userpac = req.params.userpac;
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        // console.log(decoded)


        db.query('SELECT * from usuario inner join paciente on usuario.id_usuario = paciente.id_usuario where usuario.id_usuario = ?', [decoded.id], (error, results) => {

            const idPaciente = results[0].id_paciente;

            db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = ? AND el.status = "Concluído" order by l.datahora_envio', [idPaciente], (error, results) => {

                req.listaC = results;

                return next();
            });


            /*db.query('SELECT * FROM lista as l inner join exercicios_lista as el on l.id_lista = el.id_lista join exercicios as e on el.id_exercicio = e.id_exercicio where l.id_paciente = ? order by l.datahora_envio', [decoded.id], (error, results) => {
                console.log(results);
                console.log("Lista")
                req.lista = results;
                return next();
               */
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.atualizarStatusExercicio = async (req, res, next) => {
    try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        const id_lista = parseInt(req.body.id_lista);
        const id_exercicio = parseInt(req.body.id_exercicio);
        // console.log(id_lista, id_exercicio, decoded.id);


        // Tem que se checar se os dados passados para a funcao sao validos, isso eh
        // Se o usuario logado eh o paciente que se esta atualizando, se a lista pertence a esse paciente,
        // e se o exercicio existe na lista
        // As querys aninhadas fazem as verificacoes, mas creio que e melhor criar uma funcao no banco em vez de deixar aqui
        db.query('SELECT id_paciente FROM paciente WHERE id_usuario = ?', [decoded.id], (error, results) => {
            if (results[0]) {
                const id_paciente = results[0].id_paciente;

                db.query('SELECT 1 FROM lista WHERE id_lista = ? AND id_paciente = ?', [id_lista, id_paciente], (error, results) => {
                    if (results.length > 0) {
                        db.query("UPDATE exercicios_lista SET status = 'Concluído' WHERE id_lista = ? and id_exercicio = ?", [id_lista, id_exercicio],
                        (error, results) => {
                            return next();
                        })
                    }
                    return next();
                })
            }

            return next();
        })


    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.perfildados = async (req, res, next) => {
    //  console.log(req.cookies);

    try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        //console.log(decoded.id + "decoded.id")
        db.query('SELECT * FROM profissional inner join usuario on profissional.id_usuario = usuario.id_usuario where usuario.id_usuario = ?', [decoded.id], (error, results) => {

            console.log(decoded.id)
            req.perfil = results[0];
            return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.salvarperfil = async (req, res, next) => {
    try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

        const { nome, email } = req.body;
        // console.log(nome + "," + email)
        /*db.query('SELECT * FROM profissional inner join usuario on profissional.id_usuario = usuario.id_usuario where usuario.id_usuario = ?', [decoded.id], (error, results) => {

            console.log(decoded.id)
            req.perfil = results[0];
            return next();
        });*/
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.perfilPacientes = async (req, res, next) => {
    //  console.log(req.cookies);

    try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
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

exports.tipos_usuarios = async (req, res, next) => {
    //  console.log(req.cookies);

    try {
        //const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        //console.log(decoded.id + "decoded.id")
        db.query('SELECT * FROM tipo_usuario', (error, results) => {

            req.tiposusuario = results;
            return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.exercicios_disp = async (req, res, next) => {
    //  console.log(req.cookies);

    try {
        //const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        //console.log(decoded.id + "decoded.id")
        db.query('SELECT * FROM exercicios', (error, results) => {

            req.exercicios_disp = results;
            return next(); 
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

function trataCPf(auxCpf){
    //tratando tirando a máscrada do campo de cpf
    auxCpf=auxCpf.replace("-", "");
    auxCpf=auxCpf.replaceAll('.','');
    return auxCpf;
}

function trataTelefone(auxTelefone){
    //tirando a máscara do campo de telefone
    auxTelefone=auxTelefone.replace("(", "");
    auxTelefone=auxTelefone.replace(")", "");
    auxTelefone=auxTelefone.replace("-","");
    return auxTelefone;
}

exports.atualizaDadosProfissional=async (req, res, next) => {
    const {id_usuario,nome,email,cpf,tel,crm} = req.body;
    //console.log(req.body);

    let auxCpf=trataCPf(cpf);
    let auxTelefone=trataTelefone(tel);

    try {
        //update para dados do profissional, sendo o primeiro para dados de usuario
        //e o segundo para o crm da tabela profissional
        db.query("UPDATE usuario SET nome = ?, email = ?, cpf = ?, telefone = ?  WHERE id_usuario= ? ;",[nome,email,auxCpf,auxTelefone,id_usuario]);
        db.query("UPDATE profissional SET crm = ?   WHERE id_usuario= ? ;",[crm, id_usuario]);
        return next();
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.atualizaDadosPaciente=async (req, res, next) => {
    const {id_usuario,nome,telefone,cpf,email} = req.body;
    //console.log(req.body);
    
    let auxCpf=trataCPf(cpf);
    let auxTelefone=trataTelefone(telefone);

    try {
        db.query("UPDATE usuario SET nome = ?, email = ?, cpf = ?, telefone = ?  WHERE id_usuario= ? ;",[nome,email,auxCpf,auxTelefone,id_usuario]);
        return next();
    } catch (error) {
        console.log(error);
        return next();
    }
}
