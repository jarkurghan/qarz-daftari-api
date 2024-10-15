import Joi from "joi";
import knex from "../../db/db.js";
import writeFile from "../../file/write.js";
import readFile from "../../file/read.js";
import schema from "../../validations/schema.js";

const word = {};

word.get_resources = async (req, res) => {
    try {
        const resources = await knex("resources");
        res.status(200).json(resources);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.add_resource = async (req, res) => {
    try {
        const validation = schema.createResource.validate(req.body);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });
        if (!req.file || !req.file.buffer || !Buffer.isBuffer(req.file.buffer)) return res.status(400).json({ message: "file is required" });

        // check

        req.body.file = await writeFile(req.file);
        req.body.created_by = req.user.id;
        await knex("resources").insert(req.body);
        res.status(201).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.resource_file = async (req, res) => {
    try {
        const resource = await knex("resources").where({ id: req.params.id }).first();
        const data = await readFile(resource.file);
        res.type(data.type).send(data.content);
    } catch (error) {
        if (error.message === "file does not exist") return res.status(404).json({ message: error.message });
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default word;
