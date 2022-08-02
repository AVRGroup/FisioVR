const { application } = require("express");
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
        user: req.usuario
    });
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/pacientesconcluidos', authController.isLoggedIn, (req, res) => {
    if( req.usuario && req.usuario.id_tipo_usuario == 2 ) {
        res.render('pacientesconcluidos', {
            user: req.usuario
        });
     }
});

router.get('/novalista', authController.isLoggedIn, (req, res) => {
    if( req.usuario && req.usuario.id_tipo_usuario == 2 ) {
        res.render('novalista', {
            user: req.usuario
        });
     }
});


router.get('/paciente', authController.isLoggedIn, consultas.perfilPacientes, consultas.listaExercicios, (req, res) => {
    
    if( req.usuario && req.usuario.id_tipo_usuario == 3 ) {
        res.render('paciente', {
            user: req.usuario,
            paciente: req.perfilPaciente,
            lista: req.lista
        });
        
    } else {
        if(req.usuario) {
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
    if( req.usuario && req.usuario.id_tipo_usuario == 2 ) {
        res.render('profissional', {
            user: req.usuario
        });
    } else {
        if(req.usuario) {
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
    if(req.usuario) {
        res.render('profile', {
            user: req.usuario
            //meuspacientes: req.usuprof
        });
    } else {
        res.redirect('/login');
    }
    
});

router.get('/profissional_profile', authController.isLoggedIn, consultas.consultapacientes, (req, res) => {
    if(req.usuario) {
        res.render('profissional_profile', {
            user: req.usuario, 
            //mp: req.usuprof
        });
    } else {
        res.redirect('/login');
    }
    
});

router.get('/meuspacientes', authController.isLoggedIn, consultas.consultapacientes, (req, res) => {
    if(req.usuario) {
        res.render('meuspacientes', {
            user: req.usuario, 
            mp: req.usuprof
        });
    } else {
        res.redirect('/login');
    }
    
});

router.post("/meuspacientes", (req,res) => {
    const{ usuario } = req.body;

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
    if( req.usuario ) {
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
