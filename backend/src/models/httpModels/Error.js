class ResponseError extends Error {
  constructor (message) {
    super(message)
    this.httpCode = 500
  }
}

module.exports = {
  ResponseError
}
