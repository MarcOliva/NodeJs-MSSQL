'use strict'

const express = require('express')
const user = require('../controller/user')
const producto = require('../controller/producto')
const auth = require('../midlewares/auth')
const api = express.Router()

/**GET */
api.get('/productos', auth, producto.getProductos)
/**GET */
api.get('/productos/:productoId', auth, producto.getProducto)
/**POST */
api.post('/productos', auth, producto.postProducto)
/**PUT */
api.put('/productos/:productoId', auth, producto.updateProducto)
/**DELETE */
api.delete('/productos/:productoId', auth, producto.deleProduct)


/**USER SERVICES */
api.post('/signup', user.signUp)
api.post('/signin', user.signIn)



// api.get('/private', auth, function (req, res) {
//     res.status(200).send({ message: "Tienes acceso" })
// })
module.exports = api