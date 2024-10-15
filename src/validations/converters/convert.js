/* eslint-disable import/no-anonymous-default-export */

export default function (word) {
    if (word.example && typeof word.example.example !== "undefined" && !word.example.example) delete word.example.example;
    if (word.example && typeof word.example.resource !== "undefined" && !word.example.resource) delete word.example.resource;
    if (word.example && typeof word.example.page !== "undefined" && !word.example.page) delete word.example.page;
    if (word.definition && typeof word.definition.definition !== "undefined" && !word.definition.definition) delete word.definition.definition;
    if (word.definition && typeof word.definition.resource !== "undefined" && !word.definition.resource) delete word.definition.resource;
    if (word.definition && typeof word.definition.page !== "undefined" && !word.definition.page) delete word.definition.page;
    if (word.history && typeof word.history.history !== "undefined" && !word.history.history) delete word.history.history;
    if (word.history && typeof word.history.resource !== "undefined" && !word.history.resource) delete word.history.resource;
    if (word.history && typeof word.history.page !== "undefined" && !word.history.page) delete word.history.page;
    delete word.synonyms_text;
    return word;
}
