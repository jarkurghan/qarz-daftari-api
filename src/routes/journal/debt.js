import Joi from "joi";
import knex from "../../db/db.js";
import getUserID from "../../services/get-user-id.js";

export const getDebt = async (req, res) => {
    try {
        const { journal_id } = req.params;
        const userID = getUserID(req);

        const access = await knex("journal_profile_access as access")
            .leftJoin("profile", "access.profile_id", "profile.id")
            .where({ "access.journal_id": journal_id })
            .andWhere({ "profile.user_id": userID })
            .andWhere({ "access.status": "1" })
            // .andWhere({ "access.status": "1", }) aynan shu access
            .first();
        if (!access) res.status(404).json("journal not found");

        const data = await knex("debt").where({ journal_id });

        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export const createDebt = async (req, res) => {
    try {
        const userID = getUserID(req);
        const { journal_id } = req.body;

        const access = await knex("journal_profile_access as access")
            .leftJoin("profile", "access.profile_id", "profile.id")
            .where({ "access.journal_id": journal_id })
            .andWhere({ "profile.user_id": userID })
            .andWhere({ "access.status": "1" })
            .select("profile.*")
            // .andWhere({ "access.status": "1", }) aynan shu access
            .first();
        if (!access) res.status(404).json("journal not found");

        //------------------------------------------------------------
        //   validation
        //------------------------------------------------------------
        const value = await knex("journal_value").where({ journal_id }).first();

        const schema = { name: Joi.string().required().messages({ "string.empty": "Nom kiriting!" }), journal_id: Joi.required() };
        if (value.folderable) schema.folder = Joi.string().optional();
        if (value.debt_type_required) schema.debt_type = Joi.string().required().messages({ "string.empty": "Qaytarish vaqtini kiriting!" });
        else schema.debt_type = Joi.string().optional();
        if (value.debt_type_default) value.debt_type = value.debt_type_default;
        if (value.amount_type === "float")
            if (value.amount_required) {
                schema.amount = Joi.number().greater(0).required().messages({
                    "number.base": "Bu son bo'lishi kerak",
                    "number.greater": "Qarz miqdori noto'g'ri",
                    "any.required": "Qarz miqdorini kiriting!",
                    // 'string.base': 'Ism matn bo\'lishi kerak.',
                    // 'string.empty': 'Ism kiriting.',
                    // 'string.min': 'Ism kamida 3 ta belgidan iborat bo\'lishi kerak.',
                    // 'string.max': 'Ism 30 tadan oshmasligi kerak.',
                    // 'any.required': 'Ism majburiy maydon.'
                });
            } else schema.amount = Joi.string().optional().messages({ "string.base": "Bu son bo'lishi kerak" });
        else if (value.amount_type === "string")
            if (value.amount_required) schema.amount = Joi.number().required().messages({ "any.required": "Qarzni kiriting!" });
            else schema.amount = Joi.string().optional();
        if (value.date_required) schema.date = Joi.string().required().messages({ "string.empty": "Qaytarish vaqtini kiriting!" });
        else schema.date = Joi.string().optional();
        if (value.addressable)
            if (value.address_required) schema.address = Joi.string().required().messages({ "string.empty": "Manzil kiriting!" });
            else schema.address = Joi.string().optional();
        if (value.phonable)
            if (value.phone_required) schema.phone = Joi.string().required().messages({ "string.empty": "Telefon raqam kiriting!" });
            else schema.phone = Joi.string().optional();

        const { error } = Joi.object(schema).validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        //------------------------------------------------------------
        //   action
        //------------------------------------------------------------
        const data = req.body;
        data.created_by = access.id;

        await knex.transaction(async (trx) => {
            const debt = await knex("debt").insert(req.body).returning("*").transacting(trx);
            const debt_item = { debt_id: debt[0].id, created_by: access.id, amount: data.amount, comment: data.comment };
            await knex("debt_item").insert(debt_item).transacting(trx);
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "an error occurred" });
    }
};

export const getDebtItem = async (req, res) => {
    try {
        const { debt_id } = req.params;
        const userID = getUserID(req);

        const access = await knex("journal_profile_access as access")
            .leftJoin("profile", "access.profile_id", "profile.id")
            .leftJoin("debt", "debt.journal_id", "access.journal_id")
            .where({ "debt.id": debt_id })
            .andWhere({ "profile.user_id": userID })
            .andWhere({ "access.status": "1" })
            // .andWhere({ "access.status": "1", }) aynan shu access
            .first();
        if (!access) res.status(404).json("journal not found");

        const data = await knex("debt").where({ id: debt_id });
        data.items = await knex("debt_item").where({ debt_id });

        await res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
};

export const createDebtItem = async (req, res) => {
    try {
        const userID = getUserID(req);
        const { debt_id } = req.body;

        const access = await knex("journal_profile_access as access")
            .leftJoin("profile", "access.profile_id", "profile.id")
            .leftJoin("debt", "debt.journal_id", "access.journal_id")
            .where({ "debt.id": debt_id })
            .andWhere({ "profile.user_id": userID })
            .andWhere({ "access.status": "1" })
            // .andWhere({ "access.status": "1", }) aynan shu access
            .select(["profile.*", "access.journal_id"])
            .first();
        if (!access) res.status(404).json("journal not found");

        //------------------------------------------------------------
        //   validation
        //------------------------------------------------------------
        const { journal_id } = access;
        const value = await knex("journal_value").where({ journal_id }).first();

        // to-do: validation

        //------------------------------------------------------------
        //   action
        //------------------------------------------------------------
        const data = req.body;
        data.created_by = access.id;

        await knex("debt_item").insert(data).transacting(trx);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "an error occurred" });
    }
};
