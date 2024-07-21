import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'VaultShield',
            version: '1.0.0',
            description: '',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Reemplaza con la URL base de tu API
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta a tus archivos de rutas de Express
};

const specs = swaggerJsDoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};