const { application, json } = require("express");
const express = require("express");
const authController = require('../controllers/auth')

const consultas = require('../controllers/consultas')

const router = express.Router();

router.get('/visualizarpaciente/:userpac', consultas.infopaciente, consultas.infolista, (req, res) => {
    res.render('visualizarpaciente', {
        infolista: req.infolista,
        infopac: req.infopac
    });
});


router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('login', {
        title: 'FisioVR - Login',
        layout: 'main',
        styleLibs: [{
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
            integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
            crossorigin: 'anonymous'
        }],
        navbar: [{ name: 'Cadastro', route: '/cadastro' }],
        user: req.usuario
    });
});

// authController.register
router.get('/cadastro', consultas.tipos_usuarios, (req, res) => {
    res.render('cadastro', {
        title: 'FisioVR - Cadastro',
        layout: 'main',
        styleLibs: [{
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
            integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
            crossorigin: 'anonymous'
        }],
        navbar: [{ name: 'Inicio', route: '/adm_profile' }, { name: 'Sair', route: '/auth/logout' }],
        tipos_usu: req.tiposusuario
    });
});

router.get('/pacientesconcluidos', authController.isLoggedIn, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('pacientesconcluidos', {
            user: req.usuario
        });
    }
});

router.get('/pacientes_cadastrados', authController.isLoggedIn, consultas.consultapaccadastrados, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 1) {
        res.render('pacientes_cadastrados', {
            lista_paccad: req.paccad
        });
    }
});

router.get('/profissionais_cadastrados', authController.isLoggedIn, consultas.consultaprofcadastrados, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 1) {
        res.render('profissionais_cadastrados', {
            lista_profcad: req.profcad
        });
    }
});

router.get('/exercicios_cadastrados', authController.isLoggedIn, consultas.exercicios_disp, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 1) {
        res.render('exercicios_cadastrados', {
            lista_exerciciosdisp: req.exercicios_disp
        });
    }
}); 

router.get('/novoexercicio', authController.isLoggedIn, consultas.exercicios_disp, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('novoexercicio', {
            user: req.usuario,
            exercicios_disp: req.exercicios_disp
        });
    }
});

router.get('/profissionalPerfil', authController.isLoggedIn, consultas.perfildados, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('profissionalPerfil', {
            user: req.usuario,
            infoperfil: req.perfil
        });
    }
});

router.post('/profissionalPerfil', authController.isLoggedIn, consultas.atualizaDadosProfissional, (req, res) => {
    //Chama o update de dados do profissional
    res.redirect("/profissionalPerfil");
});

router.post('/editarPerfilPaciente', authController.isLoggedIn, consultas.atualizaDadosPaciente, (req, res) => {
    //Chama o update de dados do paciente
    res.redirect("/editarPerfilPaciente");
});

router.post('/exercicio/', authController.isLoggedIn, consultas.atualizarStatusExercicio, (req, res) => {
    console.log(req.body);
    res.redirect('/paciente');
});

router.post('/execexercicio/:idexercicio', authController.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.redirect('/paciente');

    res.render('visualizarpaciente', {
        infolista: req.infolista,
        infopac: req.infopac
    });
});
// router.get('/exercicio', (req, res) => {
//     const exercise = JSON.stringify({
//         name: 'Elevação Lateral',
//         sets: 1,
//         leftReps: 2,
//         rightReps: 2,
//         rest: 3,
//         concentric: {
//             leftShoulder: 90,
//         },
//         eccentric: {
//             leftShoulder: 20,
//         },
//         margin: 5
//     });

//     // TODO: converter json para base64 modificado para econimizar caracteres
//     res.status(301).redirect(`https://avrgroup.github.io/FisioVR/?exe=${exercise}`)
// });

// router.post('/exercicio', (req, res) => {
//     console.log('Foi', req.body);
// });

router.get('/feedback', authController.isLoggedIn, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('feedback', {
            user: req.usuario
        });
    }
});

router.get('/desenvolvimento', authController.isLoggedIn, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('desenvolvimento', {
            user: req.usuario
        });
    }
});


router.get('/editarPerfilPaciente', authController.isLoggedIn, consultas.perfilPacientes, consultas.listaExerciciosPendentes, consultas.listaExerciciosConcluidos, (req, res) => {

    if (req.usuario && req.usuario.id_tipo_usuario == 3) {
        res.render('editarPerfilPaciente', {
            user: req.usuario,
            paciente: req.perfilPaciente,
            listaP: req.listaP,
            listaC: req.listaC
        });

    } else {
        if (req.usuario) {
            res.render('profissional', {
                user: req.usuario
            });
        }
        else {
            res.redirect('/login');
        }

    }

});

router.get('/paciente', authController.isLoggedIn, consultas.perfilPacientes, consultas.listaExerciciosPendentes, consultas.listaExerciciosConcluidos, (req, res) => {

    if (req.usuario && req.usuario.id_tipo_usuario == 3) {
        // transformar lista de angulos guardada como string para objeto javascritpt
        for (let i = 0; i < req.listaP.length; i++) {
            const nomes = req.listaP[i].nomes_angulos.split(',').map(e => e.trim());
            const valores_concentricos = req.listaP[i].angulos_concentricos.split(';').map(e => parseInt(e));
            const valores_excentricos = req.listaP[i].angulos_excentricos.split(';').map(e => parseInt(e));


            let concentric = {};
            let eccentric = {};
            for (let j = 0; j < nomes.length; j++) {
                concentric[nomes[j]] = valores_concentricos[j];
                eccentric[nomes[j]] = valores_excentricos[j];
            }

            req.listaP[i].concentric = concentric;
            req.listaP[i].eccentric = eccentric;
            delete req.listaP[i].nomes_angulos;
            delete req.listaP[i].angulos_concentricos;
        }

        console.log(req.listaP);

        res.render('paciente', {
            user: req.usuario,
            paciente: req.perfilPaciente,
            listaP: req.listaP,
            listaC: req.listaC
        });

    } else {
        if (req.usuario) {
            res.render('profissional', {
                user: req.usuario
            });
        }
        else {
            res.redirect('/login');
        }

    }

});

router.get('/profissional', authController.isLoggedIn, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('profissional', {
            user: req.usuario
        });
    } else {
        if (req.usuario) {
            res.render('paciente', {
                user: req.usuario

            });
        }
        else {
            res.redirect('/login');
        }

    }

});

/*router.get('/Teste', authController.isLoggedIn, (req, res) => {
    if( req.usuario ) {
        res.render('Teste', {
            user: req.usuario
        });
    } else {
        res.redirect('/login');
    }
    
});

*/

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/adm_profile', authController.isLoggedIn, (req, res) => {
    if (req.usuario) {
        res.render('adm_profile', {
            navbar: [{ name: 'Cadastro', route: '/cadastro' }, { name: 'Sair', route: '/auth/logout' }],
            user: req.usuario
            //meuspacientes: req.usuprof
        });
    } else {
        res.redirect('/login');
    }

});

router.get('/profissional_profile', authController.isLoggedIn, consultas.consultapacientes, (req, res) => {
    if (req.usuario) {
        res.render('profissional_profile', {
            user: req.usuario,
            //mp: req.usuprof
        });
    } else {
        res.redirect('/login');
    }

});

router.get('/meuspacientes', authController.isLoggedIn, consultas.consultapacientes, (req, res) => {
    if (req.usuario) {
        res.render('meuspacientes', {
            user: req.usuario,
            mp: req.usuprof
        });
    } else {
        res.redirect('/login');
    }

});

router.post("/meuspacientes", (req, res) => {
    const { usuario } = req.body;

    const testeusu = {
        usuario
    };

    meuspacientes.push(testeusu);

    return res.json(testeusu);
});

/*
router.get('/visualizarpaciente', authController.isLoggedIn, consultas.pacientes, (req, res) => {
    if(req.usuario) {
        res.render('visualizarpaciente', {
            user: req.usuario, 
            infopac: req.paciente
        });
    } else {
        res.redirect('/login');
    }
    
});
*/

router.get('/exercicios', authController.isLoggedIn, (req, res) => {
    if (req.usuario) {
        res.render('../front/src/index.hbs', {
            user: req.usuario
        });
    } else {
        res.redirect('index');
    }

})

router.use('/icons', express.static(__dirname + '/public'));

/*
router.get('/profissionalProfile', authController.isLoggedIn, (req, res) => {
    if( req.usuario ) {
        res.render('profissionalProfile', {
            user: req.usuario
        });
    } else {
        res.redirect('index');
    }
    
})
*/
module.exports = router; 
