const http = require('http');

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
