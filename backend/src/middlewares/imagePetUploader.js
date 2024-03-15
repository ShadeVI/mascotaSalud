const { randomUUID } = require('crypto')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/animal_images')
  },
  filename: function (req, file, cb) {
    const filename = randomUUID()
    const extension = path.extname(file.originalname)
    const finalName = filename + extension
    cb(null, finalName)
  }
})
const upload = multer({ storage })

module.exports = upload
