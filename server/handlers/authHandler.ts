import {db} from "../datastore";
import {ExpressHandler, User} from "../types";
import crypto from "crypto";
import {
    sinInRequest, sinInResponse,
    singUpUserRequest,singUpUserResponse
} from "../api";
import jwt from "jsonwebtoken";
import {signJwt} from "../auth";

export const singUpHandler: ExpressHandler<
    singUpUserRequest, singUpUserResponse
> = async (req, res) => {

    if (!req.body.firstName || !req.body.lastName|| !req.body.userName|| !req.body.email|| !req.body.password) {
        return res.sendStatus(400);
    }
    // you must check if this user already exists
    const passwordHash = crypto.pbkdf2Sync(req.body.password, process.env.PASSWORD_SALT!, 100000, 64, 'sha512').toString('hex');
    const user: User = {
        id: crypto.randomUUID(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: passwordHash,
    };

    await db.createUser(user);
    res.status(200).send({jwt: signJwt({userId: user.id})});
}

export const sinInHandler: ExpressHandler<sinInRequest, sinInResponse> = async (req, res) => {

    const {login, password} = req.body;

    if (!login || !password) {
        return res.sendStatus(400);
    }

    const passwordHash = crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 100000, 64, 'sha512').toString('hex');


    const user =(await db.getUserByEmail(login)) || (await db.getUserByUserName(login));
    if (!user || user.password !== passwordHash) {
        return res.sendStatus(403);
    }
    const jwt = signJwt({userId: user.id});
    return res.status(200).send({
        user:{
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
        },
        jwt,
    });

}
