import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDataBase";
import { UserDatabase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";

export const deleteUserEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const authenticationData = new Authenticator().getData(token);

        if (authenticationData.role !== "admin") {
            throw new Error("Unauthorized, only admin can delete a user")
        }

        await new UserDatabase().deleteUser(authenticationData.id)

        res.status(200).send()
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
    await BaseDatabase.destroyConnection();
}