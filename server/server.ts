import express, {ErrorRequestHandler, RequestHandler} from 'express';
import {createPostHandler, listPostHandler} from "./handlers/postHandler";
// import {listCommentsHandler, createCommentHandler} from "./handlers/commentHandler";
import {initDb} from "./datastore";
import {singUpHandler, sinInHandler} from "./handlers/authHandler";
import {requestLoggerMiddleware, errHandler} from "./middleware/loggerMiddleware";
import dotenv from "dotenv";
import {authMiddleware} from "./middleware/authMiddleware";
(async () => {
    await initDb();
    dotenv.config();

    const app = express();
    app.use(express.json());
    app.use(requestLoggerMiddleware);


//users routes
    app.post('/signIn', sinInHandler);
    app.post('/singUp', singUpHandler);

    app.use(authMiddleware);

//posts routes
    app.get('/posts', listPostHandler);
    app.post('/posts', createPostHandler);

//comment routes
//     app.get('/comments', listCommentsHandler);
//     app.post('/comments', createCommentHandler);


    app.use(errHandler);
    app.listen(3000);
})();
