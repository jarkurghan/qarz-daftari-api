/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("profile", function (table) {
            table.increments("id").primary();
            table.string("user_id").unique().notNullable();
            table.string("login").unique();
            table.string("password");
            table.uuid("avatar");
            table.string("first_name");
            table.string("last_name");
            table.string("email");
            table.string("phone");
            table.string("status").defaultTo("active").notNullable();
            table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("profile");
}
