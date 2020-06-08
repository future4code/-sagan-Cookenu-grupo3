import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDataBase";
import { UserDatabase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";

export const getOtherProfileEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const authenticationData = await new Authenticator().getData(token);

        if (authenticationData.role !== "normal") {
            throw new Error("Unauthorized. You need to be an Admin rights to see someone else information.")
        }

        const user = await new UserDatabase().getOtherProfile(req.params.id);

        res.status(200).send({
            id: user.id,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
    await BaseDatabase.destroyConnection()
}