import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";
import {hashPassword} from "../../lib/utils";

export default async function handler(req, res) {
    const dbClient = await dbConnect();

    const { name, email, password } = req.body;

    if (req.method === "POST") {
        // checking if user already exists
        const userExist = await dbClient.query('SELECT email FROM users WHERE email=$1', [email]);
        const emailResult = userExist.rows[0]
        if (emailResult){
            return res.status(422).json({ message: "Email already in use!" });
        }

        // password before storing it
        let hashedPassword = await hashPassword(password)

        // adds user to db
        const createdUser = await dbClient.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING users.id', [name, email, hashedPassword])
        const newUsersId = createdUser.rows[0].id
        const token = jwt.sign({ userId: newUsersId }, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });
        setCookie("token", token, {
            req,
            res,
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        dbClient.end()
        res.status(201).json(token)
    } else {
        dbClient.end()
        res.status(424).json({ message: "Invalid method!" });
    }
}
