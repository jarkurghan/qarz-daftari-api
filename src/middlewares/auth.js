import knex from "../db/db.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    try {
        // to-do: xavfsizlik tomonlama, response messagelarni ko'rib chiqish
        // to-do: biror qurilmadan so'rov kelsa, shu qurilmadan login bo'lganini tekshirish
        const token = req.headers.authorization.replace(/bearer /i, "");
        if (!token) return res.status(401).json("token is required");
        const obj = jwt.verify(token, process.env.MAXFIY_KALIT);
        if (!obj.user_id && !obj.exp) return res.status(401).json("invalid token");

        const { user_id } = obj;
        const user = await knex("profile")
            .leftJoin("account", "account.profile_id", "profile.id")
            .where({ status: "active" }).andWhere({ user_id })
            .first();
        if (!user) {
            // bu yerda error batafsil ko'rib chiqiladi
            return res.status(401).json("user not found");
        }
        next();
    } catch (err) {
        if (err.message === "invalid signature") return res.status(401).json("invalid token");
        if (err.message === "jwt expired") return res.status(499).json("token is expired");
        res.status(401).json("an unexpected error occurred");
        console.log(err);
    }
};
