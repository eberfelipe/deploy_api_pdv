const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['src/index.js'];

swaggerAutogen(outputFile, endpointsFiles);
