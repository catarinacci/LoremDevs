import { Repository } from "./RepositoryTypes";

//servicio de usuario

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
}

export interface IUserRepository extends Repository<User>{}

export interface IUserService{
    createUser(user:User): Promise<User>;
    findUsers(): Promise<User[]>
}