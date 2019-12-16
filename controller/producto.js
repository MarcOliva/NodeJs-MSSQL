'use strict'
const Producto = require('../model/producto')
const sql = require('mssql')
const config = require('../config')
function getProductos(req, res) {

    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }
        request.query("Select * from Productos", (err, response) => {
            if (err) {
                return res.status(500).send({ message: "Error al realizar la peticion" })
            }
            if (response.recordset.lenght === 0) {
                return res.status(404).send({ message: "No hay productos" })
            }
            console.log("DATA PRODUCTOS")
            res.status(200).send(response.recordset)

            sql.close()
        })
    })
}
function getProducto(req, res) {
    let productoId = req.params.productoId

    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }
        request.input("productoId", sql.Int, productoId)
            .query("select * from Productos where id = @productoId", (err, response) => {
                if (err) {
                    return res.status(500).send({ message: "Error al realizar la peticion" })
                }
                if (response.recordset.lenght === 0 || response.recordset === null) {
                    return res.status(404).send({ message: "La producto no existe" })
                }
                console.log("DATA PRODUCTOS")
                res.status(200).send(response.recordset)

                sql.close()
            })
    })

}
function postProducto(req, res) {
    console.log("POST", req.body)
    let producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio

    }
    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }
        request.input("nombre", sql.Text, producto.nombre)
            .input("descripcion", sql.Text, producto.descripcion)
            .input("precio", sql.Float, producto.precio)
            .query("INSERT INTO [dbo].[Productos] ([nombre],[descripcion],[precio]) VALUES (@nombre, @descripcion,@precio)", (err, response) => {
                if (err) {
                    return res.status(500).send({ message: "Error al realizar la peticion" })
                }
                console.log("DATA PRODUCTOS")
                res.status(200).send({ message: "Se registro su producto." })

                sql.close()
            })
    })

}
function updateProducto(req, res) {
    let productoId = req.params.productoId
    let producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio

    }
    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }
        request.input("nombre", sql.Text, producto.nombre)
            .input("descripcion", sql.Text, producto.descripcion)
            .input("precio", sql.Float, producto.precio)
            .query("UPDATE [dbo].[Productos] SET [nombre] = @nombre , [descripcion] = @descripcion , [precio] = @precio WHERE id=" + productoId, (err, response) => {
                if (err) {
                    return res.status(500).send({ message: "Error al realizar la peticion" })
                }
                console.log("DATA PRODUCTOS")
                res.status(200).send({ message: "El producto fue actualizado." })

                sql.close()
            })
    })

}
function deleProduct(req, res) {
    let productoId = req.params.productoId

    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }
        request.query("DELETE FROM [dbo].[Productos] WHERE id=" + productoId, (err, response) => {
            if (err) {
                return res.status(500).send({ message: "Error al realizar la peticion" })
            }
            console.log("DATA PRODUCTOS")
            res.status(200).send({ message: "El producto fue eliminado correctamente." })

            sql.close()
        })
    })
}
module.exports = {
    getProducto,
    getProductos,
    postProducto,
    updateProducto,
    deleProduct

}
