const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(__dirtname + '/paciente.html');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*
const express = require('express');

const app = express();

const path = require('path');
const router =  express.Router();

router.get('/', function(req, res){

  res.sendFile(__dirtname + '/paciente.html');


});

app.use('/', router);

app.liste(process.env.port || 3000);
*/