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
        navbar: [{ name: 'Exercicio', route: '/exercicio' }, { name: 'Cadastro', route: '/cadastro' }],
        user: req.usuario
    });
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro', {
        title: 'FisioVR - Cadastro',
        layout: 'main',
        styleLibs: [{
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
            integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
            crossorigin: 'anonymous'
        }],
        navbar: [{ name: 'Inicio', route: '/' }],
    });
});

router.get('/pacientesconcluidos', authController.isLoggedIn, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('pacientesconcluidos', {
            user: req.usuario
        });
    }
});

router.get('/novoexercicio', authController.isLoggedIn, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('novoexercicio', {
            user: req.usuario
        });
    }
});

router.get('/exercicio', (req, res) => {
    const exercise = JSON.stringify({
        name: 'Elevação Lateral',
        sets: 1,
        leftReps: 2,
        rightReps: 2,
        rest: 3,
        concentric: {
            leftShoulder: 90,
        },
        eccentric: {
            leftShoulder: 20,
        },
        margin: 5
    });

    // TODO: converter json para base64 modificado para econimizar caracteres
    res.status(301).redirect(`https://avrgroup.github.io/FisioVR/?exe=${exercise}`)
});

router.post('/exercicio', (req, res) => {
    console.log('Foi', req.body);
});

router.get('/feedback', authController.isLoggedIn, (req, res) => {
    if (req.usuario && req.usuario.id_tipo_usuario == 2) {
        res.render('feedback', {
            user: req.usuario
        });
    }
});


router.get('/paciente', authController.isLoggedIn, consultas.perfilPacientes, consultas.listaExerciciosPendentes, consultas.listaExerciciosConcluidos, (req, res) => {

    if (req.usuario && req.usuario.id_tipo_usuario == 3) {
        res.render('paciente', {
            user: req.usuario,
            paciente: req.perfilPaciente,
            listaP: req.listaC,
            listaC: req.listaP
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

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.usuario) {
        res.render('profile', {
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
