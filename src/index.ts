import dotenv from "dotenv";
dotenv.config()

import express from "express";
import { AddressInfo } from "net";
import { signupEndPoint } from "./endpoints/signupEndPoint";



const app = express();

app.use(express.json());


app.post("/signup", signupEndPoint)


const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
