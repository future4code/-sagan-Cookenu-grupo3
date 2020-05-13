import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDataBase";
import { BaseDatabase } from "../data/BaseDataBase";

export const loginEndpoint = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        const user = await new UserDatabase().getUserByEmail(req.body.email);
        const comparedResult = await new HashManager().compare(
            req.body.password,
            user.password
        );
        if (!comparedResult) {
            throw new Error("Invalid password");
        }
        const token = new Authenticator().generateToken({
            id: user.id,
            role: user.role,
        });

        res.status(200).send({
            token,
        });
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
    await BaseDatabase.destroyConnection()
}