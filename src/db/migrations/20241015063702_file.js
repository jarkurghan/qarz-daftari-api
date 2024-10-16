/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("files", function (table) {
            table.uuid("uuid").primary();
            table.string("name");
            table.string("type");
            table.timestamp("created_date").defaultTo(knex.fn.now());
        })
        .createTable("file_chunk", function (table) {
            table.increments("id").primary();
            table.uuid("uuid");
            table.binary("chunk");
            table.foreign("uuid").references("uuid").inTable("files");
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("file_chunk").dropTable("files");
}
