import knex from "../../db/db.js";
import generate_token from "../../services/generate-token.js";
import generateUserID from "../../services/generate-user-id.js";

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

export { createAccount };
