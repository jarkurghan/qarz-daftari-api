import knex from "../db/db.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    try {
        console.log(req.headers.authorization);

        const token = req.headers.authorization.replace(/bearer /i, "");
        if (!token) return res.status(401).json("token is required");
        const obj = jwt.verify(token, "maxfiykalit");
        if (!obj.id && !obj.exp) return res.status(401).json("invalid token");
        const user = await knex("users").where({ id: obj.id }).first();
        if (!user) return res.status(401).json("user not found");
        if (user.status !== 1) return res.status(401).json("user is not active");
        req.user = { id: obj.id, user_id: user.user_id };
        next();
    } catch (err) {
        if (err.message === "invalid signature") return res.status(401).json("invalid token");
        if (err.message === "jwt expired") return res.status(499).json("token is expired");
        res.status(401).json("an unexpected error occurred");
        console.log(err);
    }
};
