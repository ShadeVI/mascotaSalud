const crypto = require('node:crypto')

// Archivo usado para generar una llave secreta para generar los tokens JWT
crypto.generateKey('hmac', { length: 512 }, (err, key) => {
  if (err) console.log(err)
  console.log(key.export().toString('hex'))
})
