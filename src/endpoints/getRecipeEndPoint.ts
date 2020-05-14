import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDataBase";
import { RecipesDataBase } from "../data/RecipesDataBase";

export const getRecipeEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userData = await new Authenticator().getData(token);
        const recipeData = await new RecipesDataBase().getRecipeById(Number(req.params.id))

        res.status(200).send({
            id: recipeData.recipe_id,
            title: recipeData.recipe_title,
            description: recipeData.recipe_description,
            cratedAt: recipeData.created_at

        })
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
    await BaseDatabase.destroyConnection()
}