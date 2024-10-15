/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("languages", function (table) {
            table.increments("id").primary();
            table.string("language").notNullable();
            table.text("description");
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("users");
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("word_type", function (table) {
            table.increments("id").primary();
            table.string("type").notNullable();
            table.integer("language").notNullable();
            table.foreign("language").references("id").inTable("languages");
            table.text("description");
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
    return knex.schema.dropTable("word_type").dropTable("languages");
}
