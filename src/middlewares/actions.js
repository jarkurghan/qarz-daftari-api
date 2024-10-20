import knex from "../db/db.js";

export default (action) => {
    return async (req, res, next) => {
        try {
            // const uaction = await knex("user_action")
            //   .leftJoin("action", "action.id", "user_action.action")
            //   .where({ "action.action": action, "user_action.status": "1" })
            //   .andWhere({ "user_action.user": req.user.id })
            //   .first();
            // if (!uaction) return res.status(401).json("you can't do that");
            next();
        } catch (err) {
            res.status(401).json("an unexpected error occurred");
            console.log(err);
        }
    };
};
