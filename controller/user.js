'use strict'

const User = require('../model/user')
const bcrypt = require('bcrypt-nodejs')
const service = require('../services/index')
const sql = require('mssql')
const config = require('../config')
function signUp(req, res) {
    let user = {
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    }

    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, null, (err, hash) => {

                console.log("HASH", hash)
                request.input("email", sql.Text, user.email)
                    .input("nombre", sql.Text, user.displayName)
                    .input("password", sql.Text, hash)
                    .query("INSERT INTO [dbo].[User] ([email],[nombre],[password]) VALUES (@email, @nombre,@password)", (err, response) => {
                        if (err) {
                            if (err) return res.status(500).send({ message: `Error al crear el usuario : ${err}` })
                        }
                        console.log("DATA PRODUCTOS")
                        res.status(200).send({ token: service.createToken(user) })

                        sql.close()
                    })
            })
        })


    })

}
function signIn(req, res) {
    let email = req.body.email
    let password = req.body.password
    console.log("email", email)
    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }

        request.input("email", sql.VarChar, email)
            .query("select * from [dbo].[User] where email = @email", (err, response) => {

                if (err) {
                    if (err) return res.status(500).send({ message: err })
                }
                if (response.recordset.length === 0) {
                    return res.status(404).send({ message: "Usuario no encontrado" })
                }
                console.log("DATOS USUARIO", response.recordset)
                bcrypt.compare(password, response.recordset[0].password, function (err, result) {
                    if (result) {
                        res.status(200).send({
                            message: 'Te has loagueado correctamente',
                            token: service.createToken(response.recordset),
                            name: response.recordset.nombre

                        })
                    } else {
                        return res.status(501).send({ message: "Password incorrecto" })
                    }
                });

                sql.close()
            })


    })
}

module.exports = {
    signUp,
    signIn
}
