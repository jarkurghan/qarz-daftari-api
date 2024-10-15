import Joi from "joi";

export default Joi.object({
    phone: Joi.string()
        .regex(/^([+]\d{12})$/)
        .required(),
    email: Joi.string()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .optional(),
    password: Joi.string().required(),
});
