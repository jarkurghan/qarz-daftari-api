import Joi from "joi";
import knex from "../../db/db.js";

const comment = {};
comment.create = async (req, res) => {
    try {
        // const validation = Joi.object({ word: Joi.string().required() }).validate(req.body);
        // if (validation.error) return res.status(400).json(validation.error.details[0].message);
        const data = { word: req.params.id, comment: req.body.comment, user: req.user.id };
        if (req.body.reply) data.reply = req.body.reply;
        const word = await knex("comment").insert(data, "*");
        res.status(201).json(word[0].id);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

comment.get = async (req, res) => {
    try {
        // to'g'ri ishlayapti
        const comments = await knex("comment")
            .where("comment.word", req.params.id)
            .leftJoin("users", "users.id", "comment.user")
            .leftJoin(knex.select("comment").from("comment_like").where("dislike", false).count().groupBy("comment").as("likes"), "likes.comment", "comment.id")
            .leftJoin(knex.select("comment").from("comment_like").where("dislike", true).count().groupBy("comment").as("dl"), "dl.comment", "comment.id")
            .leftJoin(knex.select(["dislike", "comment"]).from("comment_like").where("user", req.user.id).as("class"), "class.comment", "comment.id")
            .leftJoin("comment as replied", "replied.id", "comment.reply")
            .leftJoin("users as replied_user", "replied_user.id", "replied.user")
            .select({
                comment: "comment.*",
                first_name: "users.first_name",
                last_name: "users.last_name",
                user_id: "users.user_id",
                like: "likes.count",
                dislike: "dl.count",
                classable: "class.dislike",
                replied_id: "replied.id",
                replied_comment: "replied.comment",
                replied_user: "replied_user.id",
                replied_user_id: "replied_user.user_id",
                replied_first_name: "replied_user.first_name",
                replied_last_name: "replied_user.last_name",
            })
            .orderBy("comment.id", "desc");
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

comment.like = async (req, res) => {
    try {
        // const validation = Joi.object({ word: Joi.string().required() }).validate(req.body);
        // if (validation.error) return res.status(400).json(validation.error.details[0].message);

        const data = { comment: req.body.comment, user: req.user.id, dislike: req.body.dislike };
        await knex.transaction(async (trx) => {
            await knex("comment_like").where({ comment: req.body.comment, user: req.user.id }).del().transacting(trx);
            await knex("comment_like").insert(data, "*").transacting(trx);
        });

        res.status(201).json();
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

// (async () => {
//     console.log(await knex.select("comment").from("comment_like").whereIn("comment", [2, 6]).count().groupBy("comment"));
// })();

export default comment;
