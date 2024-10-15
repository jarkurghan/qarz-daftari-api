import { v4 as uuid } from "uuid";
import JSZip from "jszip";
import knex from "../db/db.js";

export default async function writeFile(file) {
    const id = uuid();
    let { originalname, mimetype } = file;
    const zip = new JSZip();
    zip.file(originalname, file.buffer, { binary: true });
    const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

    if (!/^[a-z0-9-&() +'.,?;@%]{1,}$/i.test(originalname)) originalname = id;
    await knex("files").insert({ uuid: id, name: new Date().getTime() + "_" + originalname, type: mimetype });
    let arrayfuffer = [];
    for (let i = 0; i < buffer.length / 262144; i++)
        if (i < buffer.length / 262144 - 1) arrayfuffer.push({ chunk: buffer.slice(262144 * i, (i + 1) * 262144), file_uuid: id });
        else arrayfuffer.push({ chunk: buffer.slice(262144 * i, buffer.length), uuid: id });
    await knex("file_chunk").insert(arrayfuffer);
    return id;
}
