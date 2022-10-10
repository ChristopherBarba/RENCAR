const http = require('http');

const hostname = '74.208.159.121';
const port = 443;
const path = require('path');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World!\n');
  //res.sendFile(path.resolve(__dirname,'index.html'))
});

const app = server;

app.use('/', require('./router'));

app.get('/', (req, res) => {
    //document.write(svg)

res.sendFile(path.resolve(__dirname,'index.html'))
res.send(z)

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
