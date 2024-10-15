import knex from "../../db/db.js";

export async function search(req, res) {
    try {
        // to-do: paginition sifatsiz bo'ldi, paginition to'g'ridan to'gri baza bilan ishlansa tezlik muammo bo'lmaydi;
        const page = isNaN(req.query.page) ? 1 : Number(req.query.page);
        const count = isNaN(req.query.count) ? 40 : Number(req.query.count);
        const search = req.query.request || "";

        const results = { words: [], defs: [], hiss: [], exas: [], syns: [] };
        const promises = [];
        const args = req.query.args || [];
        if (args.includes("word"))
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        results.words = await knex("words")
                            .leftJoin("definition", "definition.word", "words.id")
                            .leftJoin("synonym", "synonym.word", "words.id")
                            .leftJoin("words as word", "word.id", "synonym.synonym")
                            .select(["words.id", "words.word", "definition.definition", "word.word as definition2"])
                            .whereILike("words.word", `%${search}%`)
                            .andWhere("words.status", 2)
                            .distinctOn("words.id");
                        // to-do: bu ish hali tugamadi; synonym bo'lmay qolishi ham mumkin;
                        results.words.map((e) => {
                            if (!e.definition) e.definition = e.definition2;
                            delete e.definition2;
                        });
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
            );

        if (args.includes("definition"))
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        results.defs = await knex("words")
                            .leftJoin("definition", "definition.word", "words.id")
                            .select(["words.id", "words.word", "definition.definition"])
                            .whereILike("definition.definition", `%${search}%`)
                            .andWhere("words.status", 2);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
            );

        if (args.includes("history"))
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        results.hiss = await knex("words")
                            .leftJoin("history", "history.word", "words.id")
                            .select(["words.id", "words.word", "history.history as definition", "history.resource"])
                            .whereILike("history.history", `%${search}%`)
                            .andWhere("words.status", 2);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
            );

        if (args.includes("resource"))
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        results.exas = await knex("words")
                            .leftJoin("example", "example.word", "words.id")
                            .select(["words.id", "words.word", "example.phrase as definition", "example.resource"])
                            .whereILike("example.phrase", `%${search}%`)
                            .andWhere("words.status", 2);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
            );

        if (args.includes("synonym"))
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        results.syns = await knex("words")
                            .leftJoin("synonym", "synonym.synonym", "words.id")
                            .leftJoin("words as word", "word.id", "synonym.word")
                            .select(["words.id", "words.word", "word.word as definition"])
                            .whereILike("words.word", `%${search}%`)
                            .andWhere("words.status", 4)
                            .andWhere("word.status", 2);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
            );

        await Promise.all(promises);

        const data = [...results.words];
        data.push(...results.defs.filter((e) => !data.find((i) => e.id === i.id)));
        data.push(...results.hiss.filter((e) => !data.find((i) => e.id === i.id)));
        data.push(...results.exas.filter((e) => !data.find((i) => e.id === i.id)));
        data.push(...results.syns.filter((e) => !data.find((i) => e.id === i.id)));
        data.sort((a, b) => b.id - a.id);

        res.status(200).json({ data: data.slice((page - 1) * count, page * count), count: data.length });
    } catch (error) {
        console.log(error);
        res.status(500).json("an error occurred");
    }
}
