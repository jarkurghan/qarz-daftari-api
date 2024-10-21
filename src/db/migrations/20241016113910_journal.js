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
            table.string("name").notNullable();
            table.integer("supervisor").notNullable();
            table.foreign("supervisor").references("id").inTable("profile");
            table.boolean("private").defaultTo(false).notNullable();
            table.boolean("note").defaultTo(true).notNullable();
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("journal_value", function (table) {
            table.increments("id").primary();
            table.integer("journal_id").notNullable();
            table.foreign("journal_id").references("id").inTable("journal");
            table.boolean("folderable").defaultTo(false).notNullable();
            table.string("debt_type_default").defaultTo("mendan qarz").notNullable();
            table.boolean("debt_type_required").defaultTo(false).notNullable();
            table.string("amount_type").defaultTo("float").notNullable();
            table.string("amount_currency").defaultTo("so'm").notNullable();
            table.boolean("amount_required").defaultTo(true).notNullable();
            table.string("date_type").defaultTo("date").notNullable();
            table.string("date_default_time").defaultTo("19:00").notNullable();
            table.boolean("date_required").defaultTo(true).notNullable();
            table.boolean("addressable").defaultTo(false).notNullable();
            table.boolean("address_required").defaultTo(false).notNullable();
            table.boolean("phonable").defaultTo(false).notNullable();
            table.boolean("phone_required").defaultTo(false).notNullable();
        })
        .createTable("journal_profile_access", function (table) {
            table.increments("id").primary();
            table.integer("profile_id").notNullable();
            table.foreign("profile_id").references("id").inTable("profile");
            table.integer("journal_id").notNullable();
            table.foreign("journal_id").references("id").inTable("journal");
            table.integer("access_id").notNullable();
            table.foreign("access_id").references("id").inTable("journal_access");
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
            table.datetime("updated_date");
            table.enu("status", ["0", "1"]).defaultTo("1").notNullable();
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("journal_profile_access")
        .dropTable("journal_value")
        .dropTable("journal")
        .dropTable("journal_access");
}
