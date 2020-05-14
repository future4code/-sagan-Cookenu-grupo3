import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDataBase";
import { UserDatabase } from "../data/UserDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";


export const signupEndPoint = async (req: Request, res: Response) => {
    try {
        if (!req.body.name) {
            throw new Error("Invalid name");
        }
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password");
        }
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role

        };
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password)

        const userDataBase = new UserDatabase()
        await userDataBase.createUser(id, user.name, user.email, hashPassword, user.role);

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({
            id,
            role: user.role,
        })

        res.status(200).send({
            token,
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
    await BaseDatabase.destroyConnection()
};
