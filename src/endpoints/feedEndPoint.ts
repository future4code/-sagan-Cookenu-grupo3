import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDataBase";
import { RecipesDataBase } from "../data/RecipesDataBase";

export const feedEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userData = await new Authenticator().getData(token);
        const recipes = await new RecipesDataBase().getFeed(userData.id)

        res.status(200).send({
            recipes
        })
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
    await BaseDatabase.destroyConnection()
}