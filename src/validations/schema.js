import createLanguage from "./models/create-language.js";
import createResource from "./models/create-resource.js";
import createWordType from "./models/create-word-type.js";
import createWord from "./models/create-word.js";
import idParameter from "./models/id-parameter.js";

export default {
    createLanguage: createLanguage,
    createWordType: createWordType,
    idParameter: idParameter,
    createResource: createResource,
    createWord: createWord,
};
