const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./build/controllers/MainController.js']

const BandDTO = require('./build/dtos/BandDTO');

const doc = {
    info: {
        version: "1.0.0",
        title: "BandMan API",
    },
    host: "localhost:3001",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [],
    definitions: {
        BandDTO: BandDTO
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)