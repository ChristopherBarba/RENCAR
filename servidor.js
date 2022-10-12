/*const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs').promises;

//const hostname = '74.208.159.121';
const hostname = 'localhost';
const port = 443;



const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World!\n');
  //res.sendFile(path.resolve(__dirname,'index.html'));
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


});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

var express = require('express');
var app = express();

//const hostname = '74.208.159.121';
const hostname = 'localhost';
const port = 443;


//seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas
app.set('view engine','ejs');

app.get('/', function(req, res){
  res.render('index');
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });