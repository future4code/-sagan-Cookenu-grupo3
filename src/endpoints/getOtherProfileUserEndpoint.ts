import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDataBase";
import { UserDatabase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";


export const getOtherProfileEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getData(token);



        const userId = req.params.id
        const userDatabase = new UserDatabase();
        const user = await userDatabase.getOtherProfile(userId);

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