import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDataBase";
import { RecipesDataBase } from "../data/RecipesDataBase";

export const createRecipeEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userData = await new Authenticator().getData(token);
        const createNewRecipe = await new RecipesDataBase().createRecipe(
            Date.now(),
            req.body.title,
            req.body.description,
            userData.id
        )

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
    await BaseDatabase.destroyConnection()
}