const express = require("express");
const authController = require('../controllers/auth')

const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.usuario
    });
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/paciente', authController.isLoggedIn, (req, res) => {
    if( req.usuario ) {
        res.render('paciente', {
            user: req.usuario
        });
    } else {
        res.redirect('/login');
    }
    
});

router.get('/profissional', authController.isLoggedIn, (req, res) => {
    if( req.usuario ) {
        res.render('profissional', {
            user: req.usuario
        });
    } else {
        res.redirect('/login');
    }
    
});


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if( req.usuario ) {
        res.render('profile', {
            user: req.usuario
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

module.exports = router;
