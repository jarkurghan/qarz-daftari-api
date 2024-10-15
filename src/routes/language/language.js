import knex from "../../db/db.js";
import idParameter from "../../validations/models/id-parameter.js";
import schema from "../../validations/schema.js";

const word = {};
word.get_languages = async (req, res) => {
    try {
        const languages = await knex("languages")
            .leftJoin("users", "users.id", "languages.created_by")
            .select({ languages: "languages.*", created_by_first_name: "users.first_name", created_by_last_name: "users.last_name" });
        res.status(200).json(languages);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.get_word_types = async (req, res) => {
    try {
        const validation = schema.idParameter.validate(req.params);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });
        const word_types = await knex("word_type").where({ language: req.params.id });
        res.status(200).json(word_types);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.add_language = async (req, res) => {
    try {
        const validation = schema.createLanguage.validate(req.body);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });

        // check

        req.body.created_by = req.user.id;
        await knex("languages").insert(req.body);
        res.status(201).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.add_word_types = async (req, res) => {
    try {
        // const validation = schema.createWordType.validate(req.body);
        // if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });

        // check
        console.log(req.body);
        req.body.created_by = req.user.id;
        await knex("word_type").insert(req.body);
        res.status(201).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default word;
