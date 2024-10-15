import knex from "../../db/db.js";
import idParameter from "../../validations/models/id-parameter.js";

// part of speech
const apis = {};

apis.getWords = async (req, res) => {
    try {
        if (!req.query.page) req.query.page = 1;
        if (!req.query.count) req.query.count = 20;
        const wordsPromise = knex("words")
            .whereIn("words.status", [1, 2])
            .leftJoin("definition", "definition.word", "words.id")
            .leftJoin("users", "words.created_by", "users.id")
            .leftJoin("word_status", "words.status", "word_status.id")
            .leftJoin("view", "words.id", "view.word")
            .leftJoin(knex("comment").select("word", knex.raw("count(*) as comments")).groupBy("word").as("x"), "x.word", "words.id")
            .select(["words.id", "words.word", "definition.definition", "x.comments", "view.count as views", "word_status.status", "first_name", "last_name"])
            .orderBy("words.status")
            .orderBy("words.id");

        const count = (await wordsPromise).length;
        const data = await wordsPromise.offset((req.query.page - 1) * req.query.count).limit(req.query.count);
        res.status(200).json({ data, count });
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

apis.getSynonyms = async (req, res) => {
    try {
        const validation = idParameter.validate(req.params);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });

        const isFound = await knex("words").where("id", req.params.id).first();
        if (!isFound) return res.status(400).json({ message: "word not found" });

        const synonyms = await knex("synonym")
            .where("synonym.word", req.params.id)
            .leftJoin("words", "synonym.synonym", "words.id")
            .select(["synonym.id", "words.word"]);

        res.status(200).json(synonyms);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

apis.getByID = async (req, res) => {
    try {
        const validation = idParameter.validate(req.params);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });

        const data = await knex("words")
            .where("words.id", req.params.id)
            .leftJoin("users", "words.created_by", "users.id")
            .leftJoin("word_type", "word_type.id", "words.word_type")
            .leftJoin("languages", "languages.id", "word_type.language")
            .leftJoin("word_status", "words.status", "word_status.id")
            .select({
                word: "words.*",
                language_id: "languages.id",
                language: "languages.language",
                word_type_id: "word_type.id",
                word_type: "word_type.type",
                status_id: "word_status.id",
                status: "word_status.status",
                first_name: "users.first_name",
                last_name: "users.last_name",
            })
            .first();
        if (!data) return res.status(400).json({ message: "word not found" });

        data.definition = await knex("definition")
            .where("definition.word", req.params.id)
            .leftJoin("resources", "resources.id", "definition.resource")
            .select(["definition.*", "resources.name as resource_name"])
            .first();
        data.example = await knex("example")
            .where("example.word", req.params.id)
            .leftJoin("resources", "resources.id", "example.resource")
            .select(["example.*", "resources.name as resource_name"])
            .first();
        data.history = await knex("history")
            .where("history.word", req.params.id)
            .leftJoin("resources", "resources.id", "history.resource")
            .select(["history.*", "resources.name as resource_name"])
            .first();
        data.synonyms = await knex("synonym")
            .where("synonym.word", req.params.id)
            .leftJoin("words", "synonym.synonym", "words.id")
            .select(["synonym.id", "words.word"]);

        data.comment = await knex("comment").select(knex.raw("count(*)")).where("word", req.params.id).first();
        data.view = await knex("view").select("count").where("word", req.params.id).first();

        if (!data.definition) data.definition = {};
        if (!data.example) data.example = {};
        if (!data.history) data.history = {};

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default apis;
