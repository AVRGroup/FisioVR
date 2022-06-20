const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post('/cadastro', authController.register);
console.log(user.id_paciente + "authjs");
router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;