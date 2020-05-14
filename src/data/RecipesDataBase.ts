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


}
