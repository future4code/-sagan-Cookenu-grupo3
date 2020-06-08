import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";

export const unfolowUserEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const authenticationData = new Authenticator().getData(token);

        if (!req.body.followed_id) {
            throw new Error("Need to send an Id to unfollow someone")
        }
        await new UserDatabase().deleteFollowUser(authenticationData.id, req.body.followed_id)

        res.status(200).send({
            message: "Unfollowed successfully"
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
}
