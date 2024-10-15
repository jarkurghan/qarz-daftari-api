import Joi from "joi";
import knex from "../../db/db.js";

const action = {};
action.action_add = async (req, res) => {
    try {
        const validation = Joi.object({
            user: Joi.number().integer().min(1).required(),
            action: Joi.number().integer().min(1).required(),
        }).validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);

        if (req.body.user == req.user.id) return res.status(400).json("not updatable");
        const user = await knex("users").where({ id: req.body.user }).first();
        if (!user) return res.status(400).json("user not found");
        const action = await knex("action").where({ id: req.body.action }).first();
        if (!action) return res.status(400).json("action not found");
        const user_action = await knex("user_action").where(req.body).andWhere({ status: "1" }).first();
        if (user_action) return res.status(400).json("the user already has this action");

        await knex("user_action").insert(req.body);
        res.status(201).json("success");
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

action.action_del = async (req, res) => {
    try {
        console.log(req.body);
        const validation = Joi.object({
            user: Joi.number().integer().min(1).required(),
            action: Joi.number().integer().min(1).required(),
        }).validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);

        if (req.body.user == req.user.id) return res.status(400).json("not updatable");
        const user = await knex("users").where({ id: req.body.user }).first();
        if (!user) return res.status(400).json("user not found");
        const action = await knex("action").where({ id: req.body.action }).first();
        if (!action) return res.status(400).json("action not found");
        const user_action = await knex("user_action").where(req.body).andWhere({ status: "1" }).first();
        if (!user_action) return res.status(400).json("user_action not found");

        await knex("user_action").where(req.body).update({ status: "0" });
        res.status(201).json("success");
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

action.get_all_user_action = async (req, res) => {
    try {
        const users = await knex("users").select(["id", "first_name", "last_name"]);
        const allacc = await knex("action");
        const actions = await knex("user_action")
            .leftJoin("action", "action.id", "user_action.action")
            .where({ "user_action.status": "1" })
            .select(["user_action.*", "action.action as action_text"]);
        for (let i = 0; i < users.length; i++) {
            users[i].name = `${users[i].first_name} ${users[i].last_name}`;
            delete users[i].first_name;
            delete users[i].last_name;
            let x = {};
            for (let j = 0; j < actions.length; j++) if (actions[j].user === users[i].id) x[actions[j].action_text] = true;
            users[i].actions = { ...x };
            for (let j = 0; j < allacc.length; j++) if (!users[i].actions[allacc[j].action]) users[i].actions[allacc[j].action] = false;
        }
        await res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

action.get_user_action = async (req, res) => {
    try {
        const data = await knex("user_action").where({ user: req.params.id });
        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

action.get_action = async (req, res) => {
    try {
        const data = await knex("action");
        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default action;
