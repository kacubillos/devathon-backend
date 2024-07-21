import express from 'express';


// Configs
import bodyParser from 'body-parser';
import cors from 'cors';
import middleware from './utils/middleware.js';

// Router
import {createUserRouter} from './routes/user.js';

// Swagger
import swagger from './swagger.js';

// Models
import userModel from './models/mariadb/user.js';

const app = express();
swagger(app);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Routes
app.use('/api/v1/users', createUserRouter({ userModel }));

// Middlewares
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;