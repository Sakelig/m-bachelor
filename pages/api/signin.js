import dbConnect from "../../lib/dbConnect";
// import User from "../../models/user";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { setCookie } from "cookies-next";
import {compareHashAndPassword} from "../../lib/utils";

export default async function handler(req, res) {
    const dbClient = await dbConnect();

    const { email, password } = req.body;

    if (req.method === "POST") {

        let user = await dbClient.query('SELECT id, password FROM users WHERE email=$1', [email])
        console.log(user)


        if (!user){
            return res.status(422).json({ message: "Wrong email or password!" });
        }

        const usersHashedPassword = user.rows[0].password
        const correctPassword = await compareHashAndPassword(password, usersHashedPassword)
        console.log(correctPassword)

        if (!correctPassword){
            return res.status(422).json({ message: "Wrong email or password!" });
        }

        const usersId = user.rows[0].id
        const token = jwt.sign({ userId: usersId }, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });

        setCookie("token", token, {
            req,
            res,
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        dbClient.end()
        res.status(200).json(token)
    } else {
        dbClient.end()
        res.status(424).json({ message: "Invalid method!" });
    }
}