import knex from "../db/db.js";

export default async function generate_id() {
    const users = await knex("users");
    const max = Math.max(...users.map((e) => parseInt(e.user_id.slice(2, 6))));
    const newID = `lu${parseInt((max + 1) / 1000)}${parseInt((max + 1) / 100) % 10}${parseInt((max + 1) / 10) % 10}${parseInt((max + 1) % 10)}`;
    return newID;
}
