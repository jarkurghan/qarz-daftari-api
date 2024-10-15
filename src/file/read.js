import JSZip from "jszip";
import knex from "../db/db.js";

export default async function readFile(uuid) {
    const arr = [];
    const data = {};
    var zip = new JSZip();
    const file = await knex.select("*").from("files").where({ uuid });
    const chunks = await knex.select("*").from("file_chunk").where({ uuid });
    if (!chunks[0]) throw new Error("file does not exist");
    data.type = file[0].type;
    for (let i = 0; i < chunks.length; i++) for (let j = 0; j < chunks[i].chunk.length; j++) arr.push(chunks[i].chunk[j]);
    let contents = await zip.loadAsync(Buffer.from(arr));
    data.content = await zip.file(Object.keys(contents.files)[0]).async("nodebuffer");
    return data;
}
