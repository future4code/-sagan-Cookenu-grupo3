import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDataBase";
import { UserDatabase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";

export const getOwnProfileEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const authenticationData = await new Authenticator().getData(token);
        const user = await new UserDatabase().getOwnProfile(authenticationData.id);

        res.status(200).send({
            id: user.id,
            email: user.email,
            role: authenticationData.role
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
    await BaseDatabase.destroyConnection()
}