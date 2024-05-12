require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// Import routers
const { authRouter } = require('./src/routes/authRouter')
const { userRouter } = require('./src/routes/userRouter')
const { petRouter } = require('./src/routes/petRouter')
const { expensesRouter } = require('./src/routes/expensesRouter')

// Import middlewares
const requireAuth = require('./src/middlewares/requireAuth')
const { petHistoryRouter } = require('./src/routes/petHistoryRouter')

const PORT = process.env.PORT || 3002

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))

app.use(express.static('public'))

app.use('/api/auth', authRouter)

app.use('/api/users', requireAuth, userRouter)

app.use('/api/pets', requireAuth, petRouter)

app.use('/api/pets', requireAuth, petHistoryRouter)

app.use('/api/expenses', requireAuth, expensesRouter)

app.use((err, req, res, next) => {
  console.log({ err })
  return res.status(err?.httpCode || 500).json({ error: err, result: null })
})

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ', PORT)
})
