const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs').promises;

const hostname = '74.208.159.121';
const port = 443;

const HTML_CONTENT_TYPE = 'text/html'

const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World!\n');
  //res.sendFile(path.resolve(__dirname,'index.html'))
    // escribimos en la respuesta el status code de 200 y el content type que necesitamos
    res.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })
    // leemos el fichero index.html y su contenido lo redirigimos a la respuesta
    createReadStream('index.html').pipe(res)

});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
