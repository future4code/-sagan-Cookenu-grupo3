import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";


export const followUserEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getData(token);

        const UsersFollow = {
            follower_id: req.body.follower_id,
        }

        const followUser = new UserDatabase()
        await followUser.followUser(authenticationData.id, UsersFollow.follower_id)

        res.status(200).send({
            message: "Followed successfully"
        });

    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
}