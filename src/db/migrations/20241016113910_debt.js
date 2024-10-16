/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("provider_access", function (table) {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.text("description");
        })
        .createTable("provider", function (table) {
            table.increments("id").primary();
            table.string("name").notNullable();
            // table.integer("supervisor").notNullable();
            // table.foreign("supervisor").references("id").inTable("profile");
            table.integer("person_id").notNullable();
            table.foreign("person_id").references("id").inTable("person");
            table.string("type");
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("provider_person_profile_access", function (table) {
            table.increments("id").primary();
            table.integer("profile_id").notNullable();
            table.foreign("profile_id").references("id").inTable("profile");
            table.integer("provider_id").notNullable();
            table.foreign("provider_id").references("id").inTable("provider");
            table.integer("access_id").notNullable();
            table.foreign("access_id").references("id").inTable("provider_access");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
            table.date("updated_date");
            table.enu("status", ["0", "1"]).defaultTo("1").notNullable();
        })
        .createTable("debt", function (table) {
            table.increments("id").primary();
            table.float("amount").notNullable();
            table.string("folder").defaultTo("/").notNullable();
            table.integer("provider_id").notNullable();
            table.foreign("provider_id").references("id").inTable("provider");
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("debt_item", function (table) {
            table.increments("id").primary();
            table.integer("debt_id").notNullable();
            table.foreign("debt_id").references("id").inTable("debt");
            table.float("amount").notNullable();
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
    return knex.schema.dropTable("debt_item").dropTable("debt").dropTable("provider_person_profile_access").dropTable("provider").dropTable("provider_access");
}
