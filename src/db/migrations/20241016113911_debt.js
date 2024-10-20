/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("debt", function (table) {
            table.increments("id").primary();
            table.string("amount");
            table.string("folder").defaultTo("/").notNullable();
            table.integer("journal_id").notNullable();
            table.foreign("journal_id").references("id").inTable("journal");
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("debt_item", function (table) {
            table.increments("id").primary();
            table.integer("debt_id").notNullable();
            table.foreign("debt_id").references("id").inTable("debt");
            table.float("amount");
            table.text("comment");
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("debt_item").dropTable("debt");
}
