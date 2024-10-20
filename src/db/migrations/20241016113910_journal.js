/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("journal_access", function (table) {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.text("description");
        })
        .createTable("journal", function (table) {
            table.increments("id").primary();
            table.string("name");
            table.integer("supervisor");
            table.foreign("supervisor").references("id").inTable("profile");
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.boolean("private").defaultTo(false).notNullable();
            table.string("default_type").defaultTo("xohlasa tanlamaslik").notNullable();
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("journal_profile_access", function (table) {
            table.increments("id").primary();
            table.integer("profile_id").notNullable();
            table.foreign("profile_id").references("id").inTable("profile");
            table.integer("journal_id").notNullable();
            table.foreign("journal_id").references("id").inTable("journal");
            table.integer("access_id").notNullable();
            table.foreign("access_id").references("id").inTable("journal_access");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
            table.date("updated_date");
            table.enu("status", ["0", "1"]).defaultTo("1").notNullable();
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("journal_person_profile_access").dropTable("journal").dropTable("journal_access");
}
