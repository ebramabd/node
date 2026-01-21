import {RequestHandler} from "express";
import {db} from "../datastore";
import {ExpressHandler, Post} from "../types";
import crypto from "crypto";

export const listPostHandler:ExpressHandler<{},{}> = async (request, response)=>{
   // throw new Error('Not implemented');
    response.send({posts: await db.listPosts()});
}

type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
interface createPostResponse {}

export const createPostHandler: ExpressHandler<
    createPostRequest, createPostResponse
> = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send('Missing title');
    }

    if (!req.body.url || !req.body.userId) {
        return res.sendStatus(400);
    }

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId,
    };

    await db.createPost(post);
    res.sendStatus(200);
}