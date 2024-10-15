/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    const user = await knex("users")
        .insert({
            email: "jarkurghan@gmail.com",
            phone: "+998772590100",
            password: "$2b$10$/Sbl7HipVpOe80xzniyvquqqdYJVOSX33jX4PNpLjghm9aQVJZgiy",
            user_id: "lu0000",
            first_name: "Najmiddin",
            last_name: "Nazirov",
        })
        .returning("*");
    await knex("user_action").insert((await knex("action")).map((e) => ({ action: e.id, user: user[0].id })));

    const language = await knex("languages")
        .insert({ language: "O'zbek tili", created_by: user[0].id, created_date: "2023-12-07 16:02:00.160006+05" })
        .returning("*");

    await knex("word_type").insert([
        {
            language: language[0].id,
            type: "Ot",
            created_by: user[0].id,
            created_date: "2023-12-07 16:03:00.160006+05",
            description:
                "mustaqil soʻz turkumlaridan biri. U boshqa turkumlardan bir necha belgi — xususiyatlari bilan ajralib turadi. Ular quyidagilardan iborat: 1) ot yasalish xususiyatiga ega: ishchi, suhbatdosh, paxtakor, bogʻbon, oshpaz, Mirzachoʻl; b) son-miqdorni bildirish xususiyatiga ega: bola — bolalar, daftar—daftarlar; v) egalik koʻrsatkichiga ega: otam, otang, otasi — otamiz, otangiz, otalari; g) kelishik shakllari bilan oʻzgaradi; maktab, maktabning, maktabni, maktabga, maktabda, maktabdan; d) gapda barcha gap boʻlaklari vazifasida keladi",
        },
        {
            language: language[0].id,
            type: "Sifat",
            created_by: user[0].id,
            created_date: "2023-12-07 16:03:00.160006+05",
            description:
                "predmet belgisini bildiruvchi soʻzlar turkumi. Grammatikada belgi soʻzi keng tushunchali boʻlib, u belgini rang-tus, hajm, shaklkoʻrinish, xususiyat va sh.k.ga koʻra bildiradi: qizil, keng, yoqimli va boshqa Shu xususiyatlariga koʻra, sifatlar maʼnosiga qarab bir necha turga boʻlinadi: rang-tus bildiruvchi sifatlar — oq, sariq, qizil, nimrang kabi; mazataʼm bildiruvchi sifatlar — shirin, nordon, achchiq, bemaza kabi; xususiyat bildiruvchi sifatlar — mehribon, sodda, mugʻambir, yuvosh kabi; shaklkoʻrinish bildiruvchi sifatlar — gavdali, novcha, uzunchoq, yassi kabi; hajmoʻlchov bildiruvchi sifatlar — keng, tor, katta, ogʻir, yengil kabi va boshqa",
        },
        {
            language: language[0].id,
            type: "Son",
            created_by: user[0].id,
            created_date: "2023-12-07 16:03:00.160006+05",
            description:
                "mustaqil soʻz turkumlaridan biri; predmetning miqdorini, sanoq jihatdan tartibini bildiruvchi soʻzlar guruhi. Son gʻam sifat va ravish kabi belgi tasavvurini bildiradi va shu jihatdan oʻsha turkumlarga yaqin turadi. Sifat predmetning belgisini, ravish harakatning belgisini, Son esa predmetning miqdori, sanogʻi va tartibiga kura belgisini bildiradi. Sonlar otlar bilan birga qoʻllanib, bir necha predmetlarningyigʻindisini, aniq miqdorini (beshta kitob) yoki noanik, miqdorini (oʻntacha bola) ifodalaydi. Son harflar bilan ifodalanadi (bir, oʻn, ellik) yoki arab va rim raqamlari bilan (3, 5, 10, V, IX, XX) koʻrsatiladi",
        },
        {
            language: language[0].id,
            type: "Fe'l",
            created_by: user[0].id,
            created_date: "2023-12-07 16:03:00.160006+05",
            description:
                'harakat bildiruvchi soʻzlar turkumi va shu turkumga oid har bir soʻz. Grammatikada "harakat" soʻzi keng tushunchali boʻlib, nafaqat harakatni, balki holat yoki hodisani ham bildiradi, mas: yugurmoq, sakramoq, yigʻlamoq, uxlamoq, oʻylamoq, sevmoq, tinchimoq, qurimoq',
        },
        {
            language: language[0].id,
            type: "Olmosh",
            created_by: user[0].id,
            created_date: "2023-12-07 16:03:00.160006+05",
            description:
                "ot, sifat, son oʻrnida qoʻllanuvchi mustaqil soʻz turkumi. Olmoshlarning asosiy maʼnosi va qaysi soʻz turkumi oʻrnida qoʻllanishi matnda oydinlashadi. Olmoshlarning maʼnosi noaniq va umumiy boʻladi. Maʼno va grammatik xususiyatlariga koʻra, Olmosh umumlashgan predmet (Olmosh - ot: men, sen, u, kim, nima, hech kim, hech nima), umumlashgan belgi (Olmosh - sifat: bu, shu, oʻsha, qaysi, allaqanday, hech qanday), umumlashgan miqdor (Olmosh - son: qancha, necha, shuncha, oʻshancha) bildi-ruvchi Olmoshlarga boʻlinadi. Olmoshlar noaniqligi, soʻz yasalishining yoʻqligi bilan boshqa soʻz turkumlaridan farqlanadi. Olmoshlar maʼno va grammatik xususiyatlariga koʻra, quyidagi turlarga boʻlinadi: kishilik olmoshlari — men, sen, u, biz, ular boʻlib, shaxslar oʻrnida ishlatiladi, Oʻzlik olmoshi — oʻz soʻzidan iborat boʻlib, predmet maʼnosini kuchaytirib, taʼkidlab koʻrsatadi; Koʻrsatish olmoshi — bu, shu, oʻsha, u, ana, mana kabilar predmet va uning belgilarini koʻrsatadi; Soʻroq olmoshi — kim? nima? qancha? qanday kabilar predmet, belgi va miqdor haqida soʻroqni bil-diradi; belgilash-jamlash Olmosh — hamma, bari, baʼzan, har nima, har qanday kabilar predmet va uning belgisini umumlashtirib, jamlab koʻrsatadi; Boʻlishsizlik olmoshi — hech kim, hech qanday, hech qanaqa, hech qaysi kabilar inkor maʼnosini bildiradi",
        },
        {
            language: language[0].id,
            type: "Ravish",
            created_by: user[0].id,
            created_date: "2023-12-07 16:03:00.160006+05",
            description:
                "mustaqil soʻz turkumlaridan biri; harakat va holatning belgisini, shuningdek, belgining belgisini bildiradi. Ravishlarning quyidagi maʼnoviy turlari mavjud: holat (tarz) Ravishlari (tez, sekin, piyoda kabi); oʻrin Ravishlari (uzoqda, yaqindan, pastda kabi); payt Ravish lari (hozir, kecha, bugun kabi); darajamiqdor Ravish lari (ancha, sal, kam kabi); maqsad Ravishlari (ataylab, joʻrttaga kabi); sabab Ravish lari (noiloj, ilojsiz, chorasizlikdan kabi). Payt, oʻrin va maqsad Ravishlaridan boshqa barcha Ravishlarni, eng umumiy xususiyatlariga koʻra, bir turga kiritish va ularni holat (tarz) Ravishlari deb atash mumkin",
        },
    ]);
}
