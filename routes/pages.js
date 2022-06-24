const express = require("express");
const authController = require('../controllers/auth')

const testando = require('../controllers/consultas')

const router = express.Router();

/*
router.get('/', testando.consultateste, (req, res) => {
    res.render('consultas', {
        teste: req.usuprof
    });
});
*/

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


router.get('/paciente', authController.isLoggedIn, (req, res) => {
    
    if( req.usuario && req.usuario.id_tipo_usuario == 3 ) {
        res.render('paciente', {
            user: req.usuario

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

router.get('/profile', authController.isLoggedIn, testando.consultateste,(req, res) => {
    if(req.usuprof) {
        res.render('profile', {
           // user: req.usuario
            user: req.usuprof
        });
    } else {
        res.redirect('/login');
    }
    
});

router.get('/exercicios', authController.isLoggedIn, (req, res) => {
    if( req.usuario ) {
        res.render('../front/src/index.hbs', {
            user: req.usuario
        });
    } else {
        res.redirect('index');
    }
    
})

router.get('/profissionalProfile', authController.isLoggedIn, (req, res) => {
    if( req.usuario ) {
        res.render('profissionalProfile', {
            user: req.usuario
        });
    } else {
        res.redirect('index');
    }
    
})

module.exports = router;
