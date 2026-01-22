import {ExpressHandler, User} from "./types";


export type singUpUserRequest = Pick<User, 'firstName' | 'lastName' | 'userName' | 'email' | 'password'>;

export interface singUpUserResponse {
    jwt: string;
}

export interface sinInRequest {
    login: string;
    password: string;
}

export type sinInResponse = {
    user:Pick<User, 'firstName' | 'lastName' | 'userName' | 'email'>;
    jwt: string;
};