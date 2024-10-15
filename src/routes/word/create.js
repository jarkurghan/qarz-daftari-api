import Joi from "joi";
import knex from "../../db/db.js";
import schema from "../../validations/schema.js";
import convert from "../../validations/converters/convert.js";

const word = {};

word.create_word_full = async (req, res) => {
    try {
        const validation = schema.createWord.validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);
        const data = validation.value;

        const checkWord = await knex("words").where("word", data.word).select("*").first();
        // bu yerda status bo'yicha tekshirish kerak - synonym
        if (checkWord) return res.status(400).json("word already exists");

        await knex.transaction(async (trx) => {
            const word = await knex("words").insert({ word: data.word, created_by: req.user.id, word_type: data.word_group }).returning("id").transacting(trx);
            if (data.definition.definition)
                await knex("definition")
                    .insert({
                        word: word[0].id,
                        definition: data.definition.definition,
                        resource: data.definition.resource,
                        page: data.definition.page,
                        written_by: req.user.id,
                    })
                    .transacting(trx);
            if (data.example.example)
                await knex("example")
                    .insert({
                        word: word[0].id,
                        phrase: data.example.example,
                        resource: data.example.resource,
                        page: data.example.page,
                        written_by: req.user.id,
                    })
                    .transacting(trx);
            if (data.history.history)
                await knex("history")
                    .insert({
                        word: word[0].id,
                        history: data.history.history,
                        resource: data.history.resource,
                        page: data.history.page,
                        written_by: req.user.id,
                    })
                    .transacting(trx);
            if (data.synonyms.length > 0) {
                const synonymes = await knex("words").whereIn("word", data.synonyms).select("*").transacting(trx);
                const news = data.synonyms.filter((e) => !Boolean(synonymes.find((i) => i.word === e)));
                const newsword = await knex("words")
                    .insert(news.map((e) => ({ word: e, created_by: req.user.id, word_type: data.word_group, status: 4 })))
                    .returning("id")
                    .transacting(trx);
                const syn = [...newsword.map((e) => e.id), ...synonymes.map((e) => e.id)];
                await knex("synonym")
                    .insert(syn.map((e) => ({ word: word[0].id, synonym: e, level: 5, written_by: req.user.id })))
                    .transacting(trx);
            }
        });
        res.status(201).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.new_word = async (req, res) => {
    try {
        const validation = Joi.object({ word: Joi.string().required() }).validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);
        const words = await knex("words").where(req.body);
        if (words.length === 0) return res.status(200).json("not found");
        res.status(200).json(words);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default word;
