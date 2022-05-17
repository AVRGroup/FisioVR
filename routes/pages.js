const express = require("express");
const authController = require('../controllers/auth')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log(req.message);
    res.render('profile');
})

module.exports = router;