const express = require('express')
const app = express()
const port = 4043





app.get('/', (req, res) => {

res.send('PRUEBA NODE')


})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})