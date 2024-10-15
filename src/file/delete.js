import knex from "../db/db.js";

export default async function deleteFile(uuid) {
    await knex.transaction(async (trx) => {
        const chunks = await knex("file_chunk").where({ uuid }).returning("id").del().transacting(trx);
        const file = await knex("files").where({ uuid }).returning("file_uuid").del().transacting(trx);
        if (!chunks[0] || !file[0]) throw new Error("file does not exist");
    });
}
