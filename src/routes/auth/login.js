import bcrypt from "bcrypt";
import knex from "../../db/db.js";
import generate_token from "../../services/generate-token.js";
import getUserID from "../../services/get-user-id.js";

const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const userID = getUserID(req);

        const user = await knex("profile").where({ user_id: userID }).first();
        if (user.login === login) return res.status(400).json("login is wrong");
        const p = await bcrypt.compare(password, user.password);
        if (!p) return res.status(400).json("password is wrong");

        const journals = await knex("journal_profile_access as access")
            .leftJoin("journal", "access.journal_id", "journal.id")
            .distinct("access.profile_id", "access.journal_id")
            .where({ "access.profile_id": user.id, status: "1" })
            .select("journal.*");

        const promises = journals.map((journal) => new Promise(async (resolve, reject) => {
            try {
                const accesses = await knex("journal_profile_access as access")
                    .leftJoin("journal_access", "access.access_id", "journal_access.id")
                    .where({ journal_id: journal.id, status: "1" })
                    .select("journal_access.name")
                journal.accesses = accesses.map(e => e.name);
                resolve();
            } catch (error) {
                reject(error);
            }
        }))
        await Promise.all(promises);

        const data = { token: generate_token(user.id), journals };
        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

const relogin = async (req, res) => {
    try {
        const userID = getUserID(req);
        const user = await knex("users").where({ user_id: userID }).first();
        const journals = await knex("journal_profile_access as access")
            .leftJoin("journal", "access.journal_id", "journal.id")
            .distinct("access.profile_id", "access.journal_id")
            .where({ "access.profile_id": user.id, status: "1" })
            .select("journal.*");

        const promises = journals.map((journal) => new Promise(async (resolve, reject) => {
            try {
                const accesses = await knex("journal_profile_access as access")
                    .leftJoin("journal_access", "access.access_id", "journal_access.id")
                    .where({ journal_id: journal.id, status: "1" })
                    .select("journal_access.name")
                journal.accesses = accesses.map(e => e.name);
                resolve();
            } catch (error) {
                reject(error);
            }
        }))
        await Promise.all(promises);

        const data = { token: generate_token(user.id), journals };
        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export { relogin, login };
