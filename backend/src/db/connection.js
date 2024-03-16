const mySQL = require('mysql2/promise')

const config = {
  host: `${process.env.MYSQL_SERVER_HOST}`,
  user: `${process.env.MYSQL_SERVER_USER}`,
  password: `${process.env.MYSQL_SERVER_PASSWORD}`,
  database: `${process.env.MYSQL_SERVER_DB}`,
  port: Number(`${process.env.MYSQL_SERVER_PORT}`)
}

function dbInit () {
  try {
    const db = mySQL.createPool(config)
    console.log('OK: conectado a la BD')
    return db
  } catch (err) {
    console.log('Error de conexión a la BD')
  }
}

module.exports = {
  db: dbInit()
}
