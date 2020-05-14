import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";


export const unfolowUserEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getData(token);

        const UnfollowUsers = {
            followed_id: req.body.followed_id,
        }

        const unfollowUser = new UserDatabase()
        await unfollowUser.followUser(authenticationData.id, UnfollowUsers.followed_id)

        res.status(200).send({
            message: "Unfollowed successfully"
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
}
