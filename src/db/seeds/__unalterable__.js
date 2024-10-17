/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
    await knex("provider_access").insert([{ name: "write" }, { name: "delete" }]);
}
