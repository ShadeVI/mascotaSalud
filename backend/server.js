require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// Import routers
const { authRouter } = require('./src/routes/authRouter')
const { userRouter } = require('./src/routes/userRouter')
const { petsRouter } = require('./src/routes/petsRouter')

// Import middlewares
const isAuthenticated = require('./src/middlewares/isAuthenticated')

const PORT = process.env.PORT || 3002

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ hello: 'hello' })
})

app.use('/auth', authRouter)
app.use('/users', isAuthenticated, userRouter)
app.use('/pets', isAuthenticated, petsRouter)

app.use((err, req, res, next) => {
  console.log('server: ', JSON.stringify(err))
  if (err?.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({ error: 'Datos duplicados' })
  }
  if (err?.name && err.name.startsWith('JsonWebTokenError')) {
    return res.status(500).json({ error: 'Token JWT no valido' })
  }
  return res.status(err.httpCode).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ', PORT)
})
