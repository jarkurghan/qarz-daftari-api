import sign from "jwt-encode";

export default function token(id) {
    return sign({ id, exp: parseInt(new Date().getTime() / 1000) + 86400 }, "maxfiykalit");
}
