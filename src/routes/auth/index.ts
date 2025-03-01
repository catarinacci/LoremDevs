import { UserRepository } from "@repositories/userRepositories";
import { IUserRepository, IUserService, User } from "types/UserTypes";
import { Router } from "express";
import { UserService } from "@services/userService";

const router = Router();

const userRepository: IUserRepository = new UserRepository()
const userService: IUserService = new UserService(userRepository)


export default () => {
    router.get("/healt", (req, res) => {
        res.send("Api is Healthy!!!");
    });

    router.get("/users", async(req,res) => {
        const users = await userService.findUsers()
        res.json(users)
    })

    router.post("/users", async (req, res) => {
        const newUser: User = req.body;
        const result = await userService.createUser(newUser)

        res.json(result)
    })

    return router;
};