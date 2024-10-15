import Joi from "joi";
import id from "../fields/id.js";

export default Joi.object({
    id: id.required().error((errors) => {
        errors.forEach((err) => {
            err.message = "params is invalid";
        });
        return errors;
    }),
});
