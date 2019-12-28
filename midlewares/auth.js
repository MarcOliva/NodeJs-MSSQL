'use strict'
const services = require('../services/index')
function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion' })
    }
    const token = req.headers.authorization.split(" ")[1]
    console.log("TOKEN", token)
    services.decodeToken(token)
        .then((response) => {
            req.user = res
            next()
        })
        .catch((err) => {
            res.status(err.status).send({ message: err.message })
        })

}

module.exports = isAuth