// import {RequestHandler} from "express";
// import {db} from "../datastore";
// import {Comment, ExpressHandler, Post} from "../types";
// import crypto from "crypto";
//
// type createCommentRequest = Pick<Comment, 'comment' | 'postId'>;
// interface createCommentResponse {}
//
//
// type listCommentRequest = Pick<Comment,'postId'>;
// interface listCommentResponse {}
//
//
// export const listCommentsHandler: ExpressHandler<listCommentRequest,listCommentResponse> = (req, res) => {
//     return res.send(db.listComment(req.body.postId as string));
// }
//
// export const createCommentHandler: ExpressHandler<createCommentRequest, createCommentResponse> = (req, res) => {
//
//     if (!req.body.postId || !req.body.comment) {
//         return res.sendStatus(400);
//     }
//
//     const comment: Comment= {
//         id: crypto.randomUUID(),
//         userId: '22',
//         postId:  req.body.postId,
//         comment:  req.body.comment,
//         postedAt: Date.now(),
//     }
//
//     db.createComment(comment);
//     return res.sendStatus(200);
// }