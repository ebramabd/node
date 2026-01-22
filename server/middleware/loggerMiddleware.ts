import {RequestHandler,ErrorRequestHandler,} from 'express';

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log('path', req.path, 'body', req.body);
    next();
};

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Something broke!');
}