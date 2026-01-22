import {User} from '../../types';

export interface UserDao {
    createUser(user: User): Promise<void>;
    getUserById(id: string) : Promise<User | undefined>;
    getUserByEmail(email:string) : Promise<User | undefined>;
    getUserByUserName(userName:string) : Promise<User | undefined>;
}