import {ExpressHandler} from "../types";
import {verifyJwt} from "../auth";
import {db} from "../datastore";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const payload = verifyJwt(token);
        const user = await db.getUserById(payload.userId);
        if (!user) {
            throw 'Invalid token';
        }
        next();
    } catch (e) {
        return res.status(401).send({ error: 'bad token'});
    }
}