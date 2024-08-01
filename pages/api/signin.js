import dbConnect from "../../lib/dbConnect";
// import User from "../../models/user";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
    const dbClient = await dbConnect();

    const { email, password } = req.body;

    if (req.method === "POST") {
        let user = null
        try {
            user = await dbClient.query(`
            SELECT *
            FROM users;
        `);


            console.log("test")
            console.log(user)
        } catch (err) {
            console.error(err)
        }

        if (user === null)
            return res.status(422).json({ message: "Wrong email or password!" });

        // const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
        //     expiresIn: "1d",
        // });

        const token = {"wow": 123}

        setCookie("token", token, {
            req,
            res,
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        // res.status(200).json(user);
        res.status(200).json(token)
    } else {
        res.status(424).json({ message: "Invalid method!" });
    }
}