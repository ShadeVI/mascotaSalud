require('dotenv').config()
const express = require('express')
const app = express()

// Import routers
const { authRouter } = require('./src/routes/authRoute')

const PORT = process.env.PORT || 3002

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ hello: 'hello' })
})

app.use('/auth', authRouter)

app.use((err, req, res, next) => {
  if (err) {
    console.log('error: ', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ', PORT)
})
