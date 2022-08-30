const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post('/cadastro', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/atualizarDados', authController.atualizarDados);

module.exports = router;