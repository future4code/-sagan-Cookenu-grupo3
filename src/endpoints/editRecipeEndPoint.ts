import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDataBase";
import { RecipesDataBase } from "../data/RecipesDataBase";

export const editRecipeEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userData = await new Authenticator().getData(token);
        const recipeOwner = await new RecipesDataBase().getRecipeCreatorByRecipeId(Number(req.params.id))
        if (recipeOwner != userData.id) {
            throw new Error("Você precisa ser o criador da receita para poder atualiza-la.")
        }
        const updateRecipe = await new RecipesDataBase().updateRecipe(
            (Number(req.params.id)), req.body.newTitle, req.body.newDescription
        )

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
    await BaseDatabase.destroyConnection()
}