import Joi from "joi";
import knex from "../../db/db.js";

export async function viewCountIncrement(req, res) {
    try {
        const validation = Joi.object({ word: Joi.number().integer().min(1).required() }).validate(req.body);
        if (validation.error) {
            console.log(validation.error);
            return res.status(400).json({ message: "something went wrong" });
        }

        const wordID = req.body.word || "";

        const word = await knex("view").select("*").where("word", wordID).first();
        if (!word) await knex("view").insert({ word: wordID, count: 1 });
        else
            await knex("view")
                .where("word", wordID)
                .update({ count: word.count + 1 });

        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(200).json({});
    }
}
