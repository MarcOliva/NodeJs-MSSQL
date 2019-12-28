const dbConfig = {
    "user": 'sa',
    "password": 'admin',
    "server": 'localhost',
    "database": 'inventario',
    "port": 1433,
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
    }
}
module.exports = {
    port: process.env.PORT || 5000,
    db: dbConfig,
    SECRET_TOKEN: 'primeraclaveie187pr62'.toString('base64')
}