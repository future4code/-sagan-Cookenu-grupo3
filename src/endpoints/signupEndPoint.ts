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
            throw new Error("Password too short");
        }
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        const id = await new IdGenerator().generate();
        const hashPassword = await new HashManager().hash(user.password)
        await new UserDatabase().createUser(id, user.name, user.email, hashPassword, user.role);
        const token = new Authenticator().generateToken({
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
