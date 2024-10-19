import bcrypt from "bcrypt";
import knex from "../../db/db.js";
import generate_id from "../../generators/generate_user_id.js";
import generate_password from "../../generators/generate_password.js";
import Joi from "joi";
import createUser from "../../validations/models/create-user.js";
import updateUser from "../../validations/models/update-user.js";
import sendEmail from "../../tools/send-email.js";
import { sendSMS } from "../../tools/send-message.js";

const user = {};

user.getUsers = async (req, res) => {
    try {
        const users = await knex("users").leftJoin("user_status", "user_status.id", "users.status").select(["users.*", "user_status.status as user_status"]);
        await res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

user.getStatuses = async (req, res) => {
    try {
        const status = await knex("user_status").whereNot({ status: "delete" });
        await res.status(200).json(status);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

Object.defineProperty(String.prototype, "toTitleCase", {
    value: function () {
        if (!this) return this;
        let str = this.trim().toLowerCase().split("");
        str[0] = str[0].toUpperCase();
        for (let i = 0; i < str.length; i++) if (str[i] === " ") str[i + 1] = str[i + 1].toUpperCase();
        return str.join("");
    },
    enumerable: false,
});

user.create = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        const phone = "+" + req.body.phone.replaceAll(/[^0-9]/gi, "");
        const first_name = (req.body.first_name || "").toTitleCase();
        const last_name = (req.body.last_name || "").toTitleCase();
        const password = req.body.password;

        const validation = createUser.validate({ phone, email, password });
        if (validation.error) return res.status(400).json(validation.error.details[0].message);

        const checkUserAlreadyExists = await knex("users").where({ email }).orWhere({ phone }).first();
        if (checkUserAlreadyExists) return res.status(400).json("user already exists");

        const user_id = await generate_id();
        const hash = await bcrypt.hash(password, await bcrypt.genSalt());

        console.log({ password, user_id });
        await knex("users").insert({ first_name, last_name, email, phone, user_id, password: hash });

        await res.status(201).json({ user_id });
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

user.update = async (req, res) => {
    try {
        const validation = updateUser.validate(req.body);
        if (validation.error) return res.status(400).json(validation.error.details[0].message);
        delete req.body.created_date;
        delete req.body.password;
        delete req.body.user_status;
        delete req.body.user_id;
        const { phone, email } = req.body;

        const status = await knex("user_status").where("id", req.body.status).first();
        if (status.status !== "active" && status.status !== "deactive") return res.status(400).json("status wrong");

        const checkUserAlreadyExists = await knex("users")
            .whereNot({ id: req.body.id })
            .andWhere((qb) => qb.where({ email }).orWhere({ phone }))
            .first();
        if (checkUserAlreadyExists) return res.status(400).json("user already exists");
        await knex("users").where({ id: req.body.id }).update(req.body);
        await res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default user;
