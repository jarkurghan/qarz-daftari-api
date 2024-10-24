import knex from "../../db/db.js";
import getUserID from "../../services/get-user-id.js";

const getJournalValue = async (req, res) => {
    try {
        const { journal_id } = req.params;
        const userID = getUserID(req);

        const access = await knex("journal_profile_access as access")
            .leftJoin("profile", "access.profile_id", "profile.id")
            .where({ "access.journal_id": journal_id })
            .andWhere({ "profile.user_id": userID })
            .andWhere({ "access.status": "1" })
            // .andWhere({ "access.status": "1", }) aynan shu access
            .first();
        if (!access) res.status(404).json("journal not found");

        const data = await knex("journal_value").where({ journal_id }).first();

        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export { getJournalValue };
