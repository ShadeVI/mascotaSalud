require("dotenv").config()
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3002

app.get("/", (req, res) => {
  res.json({hello: "hello"})
})

app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto ", PORT)
})