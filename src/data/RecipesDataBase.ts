import { BaseDatabase } from "./BaseDataBase";

export class RecipesDataBase extends BaseDatabase {
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
            .into(BaseDatabase.RECIPES_TABLE_NAME);
    }

    public async getRecipeById(recipeId: number): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(BaseDatabase.RECIPES_TABLE_NAME)
            .where({ recipe_id: recipeId });
        return result[0];
    }

    public async getFeed(userid: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT
            ${BaseDatabase.RECIPES_TABLE_NAME}.recipe_id,
            ${BaseDatabase.RECIPES_TABLE_NAME}.recipe_title,
            ${BaseDatabase.RECIPES_TABLE_NAME}.recipe_description,
            ${BaseDatabase.RECIPES_TABLE_NAME}.created_at,
            ${BaseDatabase.RECIPES_TABLE_NAME}.creator_id,
            ${BaseDatabase.USERS_TABLE_NAME}.name as creator_name
            FROM ${BaseDatabase.RECIPES_TABLE_NAME}
            LEFT JOIN ${BaseDatabase.FOLLOWS_TABLE_NAME} ON ${BaseDatabase.RECIPES_TABLE_NAME}.creator_id = ${BaseDatabase.FOLLOWS_TABLE_NAME}.followed_id
            LEFT JOIN ${BaseDatabase.USERS_TABLE_NAME} ON ${BaseDatabase.RECIPES_TABLE_NAME}.creator_id = ${BaseDatabase.USERS_TABLE_NAME}.id
            WHERE
            ${BaseDatabase.FOLLOWS_TABLE_NAME}.follower_id = '${userid}'
            `)
        return result[0][0];
    }
}

