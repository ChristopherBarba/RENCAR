/*const express = require('express')
const app = express()
const port = 5000





app.get('/', (req, res) => {

res.send('PRUEBA NODE')


})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})

*/
const { CloudServer } = require('ionos-node-cloud-deploy');

const cloud = new CloudServer({
  host: '74.208.159.121',
  username: 'root',
  password: '4RR#vTqM*w',
  localDir: __dirname + '/build',
  include: ['*.js', '*.ejs', '*.json', 'public/*']
});

cloud.deploy();