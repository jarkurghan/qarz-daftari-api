/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("resources", function (table) {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.uuid("file").notNullable();
        table.foreign("file").references("uuid").inTable("files");
        table.integer("created_by").notNullable();
        table.foreign("created_by").references("id").inTable("users");
        table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("resources");
}
