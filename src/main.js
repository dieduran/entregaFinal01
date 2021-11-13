const express = require('express')
const routerProductos= require('../routes/routerProducto')
const routerCarritos= require('../routes/routerCarrito')

//const Contenedor= require('./Contenedor')

//const carrito= new Contenedor('carritos.txt')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** Carpeta publica */
app.use(express.static('public'));

/** Routers */
app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarritos)

//no entro por ninguna api valida
app.use(function(req, res) {
    res.json({
        error: -2,
        descripcion: `ruta '${req.url}' metodo '${req.method}'  no implementada.`,
    });
});

/** Express */
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Conectado al puerto ${server.address().port}`)
})
server.on('error', (error) => {
    console.log('Ocurrio un  error...')
    console.log(error)
})


