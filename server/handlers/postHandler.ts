import {RequestHandler} from "express";
import {db} from "../datastore";
import {ExpressHandler, Post} from "../types";
import crypto from "crypto";

export interface PostResponse {
    posts: Post[];
}

export const listPostHandler:ExpressHandler<
    {},PostResponse
> = async (request, response)=>{
    console.log(request.headers.authorization)
    const posts = await db.listPosts();

    if (!posts) (
        response.status(500).send(
            {error: 'Something went wrong'})
    )

    response.send({posts: posts});
}

type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
interface createPostResponse {}

export const createPostHandler: ExpressHandler<
    createPostRequest, createPostResponse
> = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({error: 'Missing title'});
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