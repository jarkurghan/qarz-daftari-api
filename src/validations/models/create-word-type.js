import Joi from "joi";
import word from "../fields/word.js";
import id from "../fields/id.js";

export default Joi.object({
    language: id.label("language id").required(),
    type: word.required(),
});
