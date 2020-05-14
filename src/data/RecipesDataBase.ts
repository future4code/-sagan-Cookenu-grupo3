import { BaseDatabase } from "./BaseDataBase";

export class RecipesDataBase extends BaseDatabase {
    private static TABLE_NAME = "Cookenu_recipes";

    public async createRecipe(
        createDateInUnixTime: number,
        recipeTitle: string,
        recipeDescription: string,
        creatorId: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                created_at: createDateInUnixTime,
                recipe_title: recipeTitle,
                recipe_description: recipeDescription,
                creator_id: creatorId
            })
            .into(RecipesDataBase.TABLE_NAME);
    }

    public async getRecipeById(recipeId: number): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(RecipesDataBase.TABLE_NAME)
            .where({ recipe_id: recipeId });
        return result[0];
}
}
