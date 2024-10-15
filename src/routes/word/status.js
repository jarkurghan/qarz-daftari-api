import knex from "../../db/db.js";
import idParameter from "../../validations/models/id-parameter.js";

const word = {};
word.active = async (req, res) => {
    try {
        const validation = idParameter.validate(req.body);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });

        const isFound = await knex("words").where("id", req.body.id).first();
        if (!isFound) return res.status(400).json({ message: "word not found" });
        if (isFound.status === 3) return res.status(400).json({ message: "word not found" });
        if (isFound.status !== 1) return res.status(400).json({ message: "something went wrong" });

        await knex("words").where("id", req.body.id).update({ status: 2 });

        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

word.delete = async (req, res) => {
    try {
        const validation = idParameter.validate(req.body);
        if (validation.error) return res.status(400).json({ message: validation.error.details[0].message });

        const isFound = await knex("words").where("id", req.body.id).first();
        if (!isFound) return res.status(400).json({ message: "word not found" });
        if (isFound.status === 3) return res.status(400).json({ message: "word not found" });
        // synonym bo'lsa delete qilish
        // if (isFound.status !== 1) return res.status(400).json({ message: "something went wrong" });

        await knex("words").where("id", req.body.id).update({ status: 3 });

        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export default word;
