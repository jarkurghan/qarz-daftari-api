import Joi from "joi";
import word from "../fields/word.js";

export default Joi.object({
    name: word.required(),
});
