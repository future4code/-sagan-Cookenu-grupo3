import dotenv from "dotenv";
dotenv.config()

import express from "express";
import { AddressInfo } from "net";
import { signupEndPoint } from "./endpoints/signupEndPoint";
import { loginEndpoint } from "./endpoints/loginEndpoint";
import { createRecipeEndPoint } from "./endpoints/createRecipeEndpoint";
import { getRecipeEndPoint } from "./endpoints/getRecipeEndPoint";
import { feedEndPoint } from "./endpoints/feedEndPoint";

const app = express();
app.use(express.json());

app.post("/signup", signupEndPoint)
app.post("/login", loginEndpoint)
app.post("/recipes/create", createRecipeEndPoint)
app.get("/recipes/:id", getRecipeEndPoint)
app.get("/user/feed", feedEndPoint)

const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
