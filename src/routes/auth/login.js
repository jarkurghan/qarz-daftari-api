import bcrypt from "bcrypt";
import knex from "../../db/db.js";
import generate_token from "../../generators/generate_token.js";

const login = async (req, res) => {
    try {
        // validation
        const { user_id, password } = req.body;
        const user = await knex("users").where({ user_id }).first();
        // check
        const p = await bcrypt.compare(password, user.password);
        if (!p) return res.status(400).json("password is wrong");
        const actions = await knex("user_action")
            .leftJoin("action", "action.id", "user_action.action")
            .where({ user: user.id })
            .andWhere({ status: "1" })
            .select("action.action");

        const data = {
            token: generate_token(user.id),
            profile: { first_name: user.first_name, last_name: user.last_name, email: user.email },
            actions: actions.map((e) => e.action),
        };
        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export { login };
