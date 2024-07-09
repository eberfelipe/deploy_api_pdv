const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API PDV',
      version: '1.0.0',
      description: 'Documentação da API para o PDV (Frente de Caixa)',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base da API
      },
    ],
  },
  apis: ['./src/rotas/*.js'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
