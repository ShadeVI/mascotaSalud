require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Import routers
const { authRouter } = require('./src/routes/authRouter')
const { userRouter } = require('./src/routes/userRouter')
const { petRouter } = require('./src/routes/petRouter')

// Import middlewares
const requireAuth = require('./src/middlewares/requireAuth')

const PORT = process.env.PORT || 3002
const corsOptions = {
  origin: 'http://localhost:5173'
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)

app.use('/users', requireAuth, userRouter)

app.use('/pets', requireAuth, petRouter)

app.use((err, req, res, next) => {
  return res.status(err?.httpCode || 500).json({ error: err?.message || 'Error interno' })
})

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ', PORT)
})
