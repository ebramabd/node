import express, {ErrorRequestHandler, RequestHandler} from 'express';
import {createPostHandler, listPostHandler} from "./handlers/postHandler";
import {listCommentsHandler, createCommentHandler} from "./handlers/commentHandler";

const app = express();
app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, res, next)=>{
    console.log('path',req.path, 'body', req.body);
    next();
};
app.use(requestLoggerMiddleware);

//posts routes
app.get('/posts', listPostHandler);
app.post('/posts', createPostHandler);

//comment routes
app.get('/comments', listCommentsHandler);
app.post('/comments', createCommentHandler);


const errHandler: ErrorRequestHandler = (err, req, res, next)=>{
    console.error(err.message);
    return res.status(500).send('Something broke!');
}
app.use(errHandler);
app.listen(3000); 