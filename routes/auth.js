const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post('/cadastro', authController.register);


module.exports = router;