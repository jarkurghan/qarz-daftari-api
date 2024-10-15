import Joi from "joi";
import word from "../fields/word.js";

export default Joi.object({
    language: word.required(),
    description: word.optional().allow(""),
});
