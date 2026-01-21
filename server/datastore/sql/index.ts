import { open, Database} from "sqlite";
import sqlite3 from "sqlite3";
import {Datastore} from "../index";
import {Comment, Like, Post, User} from "../../types";
import path from 'path';

export class SqlDataStore implements Datastore{

    private db!: Database<sqlite3.Database, sqlite3.Statement>

    public async openDb(){
        this.db = await open({
            filename: path.join(__dirname, 'coder.sqlite'),
            driver: sqlite3.Database
        });

        this.db.run('PRAGMA foreign_keys = ON;');

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
        });

        return this;
    }

    createComment(comment: Comment): Promise<void> {
        return Promise.resolve(undefined);
    }

    createLike(like: Like): Promise<void> {
        return Promise.resolve(undefined);
    }

    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?, ?, ?, ?, ?)',
            post.id, post.title, post.url, post.userId, post.postedAt
        );
    }

    async createUser(user: User): Promise<void> {
        await this.db.run(
            'INSERT INTO users (id, firstName, lastName, userName, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            user.id, user.firstName, user.lastName, user.userName, user.email, user.password
        );
    }

    deleteComment(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    deletePost(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(undefined);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const user = await this.db.get<User>(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return user;
    }


    async getUserByUserName(userName: string): Promise<User | undefined> {
        const user = await this.db.get<User>(
            'SELECT * FROM users WHERE userName = ?',
            [userName]
        );
        return user;
    }

    listComment(postId: string): Promise<Comment[]> {
        return Promise.resolve([]);
    }

    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts');
    }

}