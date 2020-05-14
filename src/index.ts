import dotenv from "dotenv";
dotenv.config()

import express from "express";
import { AddressInfo } from "net";
import { signupEndPoint } from "./endpoints/signupEndPoint";

import { getOwnProfileEndPoint } from "./endpoints/getOwnProfileEndpoint";
import { getOtherProfileEndPoint } from "./endpoints/getOtherProfileUserEndpoint";

import { loginEndpoint } from "./endpoints/loginEndpoint";
import { createRecipeEndPoint } from "./endpoints/createRecipeEndpoint";
import { getRecipeEndPoint } from "./endpoints/getRecipeEndPoint";
import { followUserEndPoint } from "./endpoints/followUserEndpoint";
import { unfolowUserEndPoint } from "./endpoints/unfollowUserEndpoint";

const app = express();
app.use(express.json());

app.post("/signup", signupEndPoint)
app.post("/login", loginEndpoint)
app.post("/user/follow", followUserEndPoint)
app.post("/user/unfollow", unfolowUserEndPoint)

app.get("/user/profile", getOwnProfileEndPoint)
app.get("/user/:id", getOtherProfileEndPoint)

app.post("/recipes/create", createRecipeEndPoint)
app.get("/recipes/:id", getRecipeEndPoint)


const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
