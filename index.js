'use strict'
const app = require('./app')
const config = require('./config')
const sql = require('mssql')
const cors = require('cors')
const bodyParser = require('body-parser')

sql.connect(config.db, (err) => {
    if (err) { console.log("error en conexion", err); return }
    console.log("App conectada a MSSQL")
    sql.close()
    //app.use(cors())
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })

})
