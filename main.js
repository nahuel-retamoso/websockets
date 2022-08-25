const express = require('express')
const hbs = require('hbs')

const ProductosApi = require('./api.js')

const productosApi = new ProductosApi()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Set engine
app.set('view engine', 'hbs')
app.set('views', './views')




//--------------------------------------------

app.post('/productos', (req, res) => {
    // handlebars - render
    const producto = productosApi.guardar(req.body)
    res.render('formulario', { producto })
})

app.get('/productos', (req, res) => {
    // handlebars - render
    const productos = productosApi.listarAll()
    res.render('vista', { productos })
});

//--------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))