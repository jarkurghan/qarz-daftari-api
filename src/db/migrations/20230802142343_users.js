/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("user_status", function (table) {
            table.increments("id").primary();
            table.string("status").notNullable();
            table.text("description");
        })
        .createTable("avatar_status", function (table) {
            table.increments("id").primary();
            table.string("status").notNullable();
            table.text("description");
        })
        .createTable("action", function (table) {
            table.increments("id").primary();
            table.string("action").notNullable();
            table.text("description").notNullable();
        })
        .createTable("users", function (table) {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("user_id").notNullable().unique();
            table.string("password").notNullable();
            table.string("email");
            table.string("phone");
            table.integer("status").defaultTo(1).notNullable();
            table.foreign("status").references("id").inTable("user_status");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
        })
        .createTable("user_action", function (table) {
            table.increments("id").primary();
            table.enu("status", ["0", "1"]).defaultTo("1").notNullable();
            table.integer("user").notNullable();
            table.foreign("user").references("id").inTable("users");
            table.integer("action").notNullable();
            table.foreign("action").references("id").inTable("action");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
            table.integer("created_by");
            table.foreign("created_by").references("id").inTable("users");
            table.date("aborted_date");
            table.integer("aborted_by");
            table.foreign("aborted_by").references("id").inTable("users");
        })
        .createTable("avatars", function (table) {
            table.increments("id").primary();
            table.integer("status").defaultTo(1).notNullable();
            table.foreign("status").references("id").inTable("avatar_status");
            table.integer("user").notNullable();
            table.foreign("user").references("id").inTable("users");
            table.uuid("avatar").notNullable();
            table.foreign("avatar").references("uuid").inTable("files");
            table.date("created_date").defaultTo(knex.fn.now()).notNullable();
            table.date("aborted_date");
            table.date("activated_date");
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("avatars").dropTable("user_action").dropTable("users").dropTable("action").dropTable("avatar_status").dropTable("user_status");
}
