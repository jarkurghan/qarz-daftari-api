/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("debt", function (table) {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("amount");
            table.datetime("date");
            table.string("address");
            table.string("phone");
            table.string("folder").defaultTo("/").notNullable();
            table.string("debt_type");
            table.integer("journal_id").notNullable();
            table.foreign("journal_id").references("id").inTable("journal");
            table.enu("status", ["0", "1"]).defaultTo("1").notNullable();
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("debt_item", function (table) {
            table.increments("id").primary();
            table.integer("debt_id").notNullable();
            table.foreign("debt_id").references("id").inTable("debt");
            table.float("amount");
            table.text("comment");
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("debt_item").dropTable("debt");
}
