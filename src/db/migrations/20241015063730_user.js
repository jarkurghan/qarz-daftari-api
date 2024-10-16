/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("profile", function (table) {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("email");
            table.string("phone");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("account", function (table) {
            table.increments("id").primary();
            table.integer("profile_id").notNullable();
            table.foreign("profile_id").references("id").inTable("profile");
            table.string("login").notNullable().unique();
            table.string("password").notNullable();
            table.string("status").defaultTo("active").notNullable();
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("person", function (table) {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.integer("supervisor").notNullable();
            table.foreign("supervisor").references("id").inTable("profile");
            table.integer("created_by").notNullable();
            table.foreign("created_by").references("id").inTable("profile");
            table.boolean("private").defaultTo(false).notNullable();
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
            table.string("status").defaultTo("active").notNullable();
        })
        .createTable("person_profile", function (table) {
            table.increments("id").primary();
            table.integer("profile_id").notNullable();
            table.foreign("profile_id").references("id").inTable("profile");
            table.integer("person_id").notNullable();
            table.foreign("person_id").references("id").inTable("person");
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
    return knex.schema.dropTable("person_profile").dropTable("person").dropTable("account").dropTable("profile");
}
