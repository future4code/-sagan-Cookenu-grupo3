import knex from "knex";
import { BaseDatabase } from "./BaseDataBase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "Cookenu_user";

    public async createUser(
        id: string,
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                id,
                name,
                email,
                password,
                role
            })
            .into(UserDatabase.TABLE_NAME);
    }

    public async getUserByEmail(email: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

        return result[0];
    }
  
    public async getOwnProfile(id: string): Promise <any> {
        const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ id })

        return result [0]
    }

    public async getOtherProfile(id: string): Promise <any> {
        const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ id })

        return result [0]
    }
}
