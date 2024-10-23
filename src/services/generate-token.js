import sign from "jwt-encode";

export default function token(user_id) {
    return sign({ user_id, exp: parseInt(new Date().getTime() / 1000) + (365 * 86400) / 2 }, process.env.MAXFIY_KALIT);
}
