import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDataBase";
import { RecipesDataBase } from "../data/RecipesDataBase";

export const deleteRecipeEndPoint = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userData = await new Authenticator().getData(token);
        const recipeOwner = await new RecipesDataBase().getRecipeCreatorByRecipeId(Number(req.params.id))
        console.log(userData.id)
        console.log(recipeOwner)
        console.log(recipeOwner != userData.id)
        console.log(userData.role)
        console.log(userData.role != "admin")
        if ((recipeOwner != userData.id) || (userData.role == "admin")) {
            throw new Error("Você precisa ser o criador da receita ou um administrador para poder remove-la")
        }
        const deleteRecipe = await new RecipesDataBase().deleteRecipe(Number(req.params.id))

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
    await BaseDatabase.destroyConnection()
}