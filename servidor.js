const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs').promises;

const hostname = '74.208.159.121';
const port = 443;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World!\n');
  //res.sendFile(path.resolve(__dirname,'index.html'))

});
const requestListener = function (req, res) {
  fs.readFile(__dirname + "/index.html")
      .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
      })
      .catch(err => {
          res.writeHead(500);
          res.end(err);
          return;
      });
};



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
