import Joi from "joi";
export default Joi.string()
    .regex(/[\s\S]+/)
    .max(150);
