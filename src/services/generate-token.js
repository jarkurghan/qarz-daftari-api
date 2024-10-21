import sign from "jwt-encode";

export default function token(id) {
    return sign({ user_id: id, exp: parseInt(new Date().getTime() / 1000) + 86400 }, process.env.MAXFIY_KALIT);
}
