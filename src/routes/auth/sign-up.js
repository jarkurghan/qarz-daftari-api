import knex from "../../db/db.js";
import generate_token from "../../services/generate-token.js";
import generateUserID from "../../services/generate-user-id.js";

const signup = async (req, res) => {
    try {
        // to-do: validation
        // to-do: convertation
        const userID = generateUserID();
        const user = await knex("profile").where({ user_id: userID }).update(req.body).returning("*")

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

const createAccount = async (req, res) => {
    try {
        const userID = generateUserID();
        const allAccess = await knex("journal_access");
        let profile;
        let journal;

        await knex.transaction(async (trx) => {
            profile = await knex("profile").insert({ user_id: userID }).returning("id").transacting(trx);
            const data = { name: "Qarz daftari", supervisor: profile.id, created_by: profile.id, private: true }
            journal = await knex("journal").insert(data).returning("*").transacting(trx);
            const data2 = allAccess.map(e => ({ access_id: e.id, profile_id: profile.id, journal_id: journal.id }))
            await knex("journal_profile_access").insert(data2).transacting(trx);
        });

        journal.accesses = allAccess.map(e => e.name);
        const data = { token: generate_token(profile.id), journals: journal };
        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export { createAccount, signup };
