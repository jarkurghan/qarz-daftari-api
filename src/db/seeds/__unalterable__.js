/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
    await knex("user_status").insert([{ status: "active" }, { status: "deactive" }, { status: "delete" }]);

    await knex("avatar_status").insert([{ status: "active" }, { status: "deactive" }, { status: "delete" }]);

    await knex("action").insert([
        { action: "Create word", description: "So'z yaratish" },
        { action: "Update word", description: "Boshqalar yaratgan so'zni o'zgartirish" },
        { action: "Create resource", description: "Resurs yaratish" },
        { action: "Create language", description: "Til yaratish" },
        { action: "Create word type", description: "So'z turkumi yaratish" },
        { action: "View users", description: "Adminlarni ko'rish" },
        { action: "Create user", description: "Admin yaratish" },
        { action: "Update user info", description: "Adminlarni o'zgartirish" },
    ]);

    await knex("word_status").insert([
        { status: "visiting-round", description: "yangi so'z, ko'rib chiqish jarayonida" },
        { status: "active", description: "foydalanish davridagi so'z" },
        { status: "delete", description: "so'z va so'z bilan bog'liq barcha ma'lumotlar o'chirib tashlangan" },
        { status: "synonym", description: "sinonim sifatida yaratilgan" },
    ]);

    // await knex("view_level").insert([{ level: "ko'rish" }, { level: "yetarlicha ko'rish" }, { level: "batafsil ko'rish" }]);
}
