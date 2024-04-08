const logger = require('./logger')

const requestLogger = (request: any, response: any, next: any) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request: any, response: any) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, request: any, response: any, next: any) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    }

    next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}