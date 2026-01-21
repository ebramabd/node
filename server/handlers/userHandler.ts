import {db} from "../datastore";
import {ExpressHandler, User} from "../types";
import crypto from "crypto";

type getUserByEmailRequest = Pick<User, 'email'>;
interface getUserByEmailResponse {}

type createUserRequest = Pick<User, 'firstName' | 'lastName' | 'userName'| 'email'| 'password'>;
interface createUserResponse {}

type getUserByNameRequest = Pick<User, 'userName'>;
interface getUserByNameResponse {}

export const getUserByNameHandler:ExpressHandler<
    getUserByNameRequest,getUserByNameResponse
> = async (request, response)=>{
    response.send(await db.getUserByUserName(request.body.userName as string));
}

export const getUserByEmailHandler:ExpressHandler<
    getUserByEmailRequest,getUserByEmailResponse
> = async (request, response)=>{
    response.send(await db.getUserByEmail(request.body.email as string));
    // console.log(user)
    // return user;
}

export const createUserHandler: ExpressHandler<
    createUserRequest, createUserResponse
> = async (req, res) => {

    if (!req.body.firstName || !req.body.lastName|| !req.body.userName|| !req.body.email|| !req.body.password) {
        return res.sendStatus(400);
    }
    // you must check if this user already exists
    const user: User = {
        id: crypto.randomUUID(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    };

    await db.createUser(user);
    res.sendStatus(200);
}

export const sinInHandler: ExpressHandler<{}, {}> = (req, res) => {

}