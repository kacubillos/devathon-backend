import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory system',
            version: '1.0.0',
            description: '',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.ts'],
};

const specs = swaggerJsDoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};