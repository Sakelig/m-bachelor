import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import dbConnect from "./dbConnect";
// import User from "../models/user";

export default async function getUser(req, res) {
    const token = getCookie("token", { req, res });

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        const dbClient = await dbConnect()
        let user = await dbClient.query('SELECT * FROM users WHERE id=$1', [data.userId])
        user = JSON.parse(JSON.stringify(user.rows[0]));
        console.log(user)
        return user;
    } catch (error) {
        return null;
    }
}