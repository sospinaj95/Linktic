import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './src/routes/default.routes.mjs'
import {AuthMiddleware} from './src/middlewares/auth.middleware.mjs';
let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Aquí se usan las rutas
app.use('/api/catalog/v1', AuthMiddleware, routes);
// And now for any exception.
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('error: 500 Internal Server Error')
});
export default app;
