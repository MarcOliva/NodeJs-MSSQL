'use strict'
const app = require('./app')
const config = require('./config')
const sql = require('mssql')

sql.connect(config.db, (err) => {
    //const req = new sql.Request()
    if (err) { console.log("error en conexion", err); return }
    // req.query("Select * from Productos", (err, response) => {
    //     if (err) {
    //         console.log(err); return
    //     } else {
    //         console.log("DATA PRODUCTOS", response.recordset)
    //     }
    //     sql.close()
    // })
    console.log("App conectada a MSSQL")
    sql.close()
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })

})
