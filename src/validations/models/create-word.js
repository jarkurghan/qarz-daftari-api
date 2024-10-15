import Joi from "joi";
import id from "../fields/id.js";

// to-do: regex for definition, example, history

const regex = /^[a-z‘ ]+$/i;

const word = Joi.string()
    .regex(regex)
    .required()
    .error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "invalid word";
        return errors;
    });

const language = Joi.number()
    .integer()
    .min(1)
    .required()
    .error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "select language";
        return errors;
    });

const word_group = Joi.number()
    .integer()
    .min(1)
    .required()
    .error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "select part of speech";
        return errors;
    });

const definitionRequired = Joi.object({
    definition: Joi.string().required(),
    resource: Joi.string().required(),
    page: Joi.string().required(),
}).error((errors) => {
    console.log(errors[0].code);
    errors[0].message = "enter definition or synonym";
    return errors;
});

const definitionOptional = Joi.object({
    definition: Joi.string().optional(),
    resource: Joi.number().when("definition", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
    page: Joi.number().when("definition", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
}).error((errors) => {
    console.log(errors[0].code);
    errors[0].message = "definition is incomplete. fill or remove";
    return errors;
});

const example = Joi.object({
    example: Joi.string().optional(),
    resource: Joi.number().when("example", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
    page: Joi.number().when("example", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
}).error((errors) => {
    console.log(errors[0].code);
    errors[0].message = "example is incomplete. fill or remove";
    return errors;
});

const history = Joi.object({
    history: Joi.string().optional(),
    resource: Joi.string().when("history", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
    page: Joi.string().when("history", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
}).error((errors) => {
    console.log(errors[0].code);
    errors[0].message = "history of origin is incomplete. fill or remove";
    return errors;
});

const synonymsOptional = Joi.array()
    .items(Joi.string().regex(regex))
    .min(0)
    .required()
    .error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "invalid word in synonyms";
        return errors;
    });

const synonymsRequired = Joi.array()
    .items(Joi.string().regex(regex))
    .min(1)
    .required()
    .error((errors) => {
        console.log(errors[0].code);
        errors[0].message = "enter definition or synonym";
        return errors;
    });

const byDef = Joi.object({ id: id, word: word, language, word_group, definition: definitionRequired, example, history, synonyms: synonymsOptional });
const bySyn = Joi.object({ id: id, word: word, language, word_group, definition: definitionOptional, example, history, synonyms: synonymsRequired });

const createWord = Joi.alternatives().try(bySyn, byDef);

export default createWord;
