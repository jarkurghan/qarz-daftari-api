import knex from "../../db/db.js";

const word = {};
word.get_words = async (req, res) => {
    try {
        const words = await knex("words").whereNotIn("status", [1, 2]);
        res.status(200).json(words);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.get_words_full = async (req, res) => {
    try {
        const words = await knex("words")
            .whereNotIn("status", [1, 2])
            .leftJoin("definition", "definition.word", "words.id")
            .leftJoin("example", "example.word", "words.id")
            .leftJoin("history", "history.word", "words.id")
            .distinctOn("words.id")
            // synonyms
            .select({
                id: "words.id",
                word: "words.word",
                definition: "definition.definition",
                example: "example.phrase",
                history: "history.history",
            });
        res.status(200).json(words);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.get_word_by_id = async (req, res) => {
    try {
        const word = await knex("words")
            .where("words.id", req.params.id)
            // .whereNotIn("status", [1,2])
            .leftJoin("definition", "definition.word", "words.id")
            .select(["words.id", "words.word", "definition.definition"])
            .distinctOn("words.id")
            .first();
        res.status(200).json(word);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default word;
