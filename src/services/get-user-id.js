import jwt from "jsonwebtoken";

export default function getUserID(req) {
    const token = req.headers.authorization.replace(/bearer /i, "");
    const obj = jwt.verify(token, process.env.MAXFIY_KALIT);
    const { user_id } = obj;

    return user_id;
}
