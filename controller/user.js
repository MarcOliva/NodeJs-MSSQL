'use strict'

const User = require('../model/user')
const bcrypt = require('bcrypt-nodejs')
const service = require('../services/index')
const sql = require('mssql')
const config = require('../config')
function signUp(req, res) {
    let user = {
        email: req.body.email,
        displayName: req.body.name,
        password: req.body.password
    }

    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }

        request.input("email", sql.VarChar, user.email)
            .query("SELECT * FROM [dbo].[User] WHERE email = @email", (err, response) => {
                if (err) {
                    return res.status(501).send({
                        error: true,
                        message: `Error al crear el usuario : ${err}`
                    })
                }
                if (response.recordset.length > 0) {
                    return res.status(403).send({
                        error: true,
                        message: "El email ya esta siendo usado."
                    })
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, null, (err, hash) => {

                            console.log("HASH", hash)
                            console.log("Datos", user.email, user.displayName)
                            request.input("name", sql.Text, user.displayName)
                                .input("password", sql.Text, hash)
                                .query("INSERT INTO [dbo].[User] ([email],[name],[password]) VALUES (@email, @name,@password)", (err, response) => {
                                    if (err) {
                                        return res.status(502).send({
                                            error: true,
                                            message: `Error al crear el usuario : ${err}`
                                        })
                                    }
                                    return res.status(200).send({ error: false, message: "Registro Exitoso !", nombre: user.displayName, token: service.createToken(user) })

                                })

                        })
                    })
                }

            })

    })

}
function signIn(req, res) {
    let email = req.body.email
    let password = req.body.password
    console.log("email", req.body)
    sql.connect(config.db, (err) => {
        const request = new sql.Request()
        if (err) { console.log("error en conexion", err); return }

        request.input("email", sql.VarChar, email)
            .query("select * from [dbo].[User] where email = @email", (err, response) => {

                if (err) {
                    if (err) return res.status(500).send({
                        error: true,
                        message: err
                    })
                }
                if (response.recordset.length === 0) {
                    return res.status(404).send({
                        error: true,
                        message: "Usuario no encontrado"
                    })
                }
                console.log("DATOS USUARIO", response.recordset)
                bcrypt.compare(password, response.recordset[0].password, function (err, result) {
                    if (result) {
                        res.status(200).send({
                            error: false,
                            message: 'Te has loagueado correctamente',
                            token: service.createToken(response.recordset),
                            name: response.recordset.name

                        })
                    } else {
                        return res.status(501).send({
                            error: true,
                            message: "Password incorrecto"
                        })
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
