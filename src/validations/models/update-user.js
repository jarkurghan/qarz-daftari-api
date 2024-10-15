import Joi from "joi";

export default Joi.object({
    id: Joi.number().integer().min(1).required(),
    first_name: Joi.string()
        .regex(/^[A-Za-z' ]*$/)
        .required(),
    last_name: Joi.string()
        .regex(/^[A-Za-z' ]*$/)
        .required(),
    phone: Joi.string()
        .regex(/^([+]?\d{1,3})\s?(\d{2,3}\s?){2,3}\d{0,3}$/)
        .required(),
    email: Joi.string()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .optional(),
    status: Joi.number().integer().min(1).required(),
    user_id: Joi.optional(),
    user_status: Joi.optional(),
    password: Joi.optional(),
    created_date: Joi.optional(),
});
