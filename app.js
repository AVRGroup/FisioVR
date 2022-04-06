/*const http = require('http');

const hostname = '200.131.17.17';
const port = 10800;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

let http = require('http')
let port = 10800
let ip = 'localhost'

let server = http.createServer((req, res) => {
  if (req.url == '/') {
    res.end('<h1>Home</h1>')
  }

  res.end('<h1>URL sem resposta definida!</h1>')
})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})