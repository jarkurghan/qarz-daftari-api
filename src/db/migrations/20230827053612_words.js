/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return (
        knex.schema
            .createTable("word_status", function (table) {
                table.increments("id").primary();
                table.string("status").notNullable();
                table.text("description");
            })
            // .createTable("view_level", function (table) {
            //     table.increments("id").primary();
            //     table.string("level").notNullable();
            // })
            .createTable("words", function (table) {
                table.increments("id").primary();
                table.string("word").notNullable();
                table.integer("word_type").notNullable();
                table.foreign("word_type").references("id").inTable("word_type");
                table.integer("status").defaultTo(1).notNullable();
                table.foreign("status").references("id").inTable("word_status");
                table.integer("created_by").notNullable();
                table.foreign("created_by").references("id").inTable("users");
                table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("history", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.text("history").notNullable();
                table.integer("resource").notNullable();
                table.foreign("resource").references("id").inTable("resources");
                table.integer("page").notNullable();
                table.integer("written_by").notNullable();
                table.foreign("written_by").references("id").inTable("users");
                table.datetime("written_date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("example", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.text("phrase").notNullable();
                table.string("word_position");
                table.integer("resource").notNullable();
                table.foreign("resource").references("id").inTable("resources");
                table.integer("page").notNullable();
                table.integer("written_by").notNullable();
                table.foreign("written_by").references("id").inTable("users");
                table.datetime("written_date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("definition", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.text("definition").notNullable();
                table.integer("resource").notNullable();
                table.foreign("resource").references("id").inTable("resources");
                table.integer("page").notNullable();
                table.integer("written_by").notNullable();
                table.foreign("written_by").references("id").inTable("users");
                table.datetime("written_date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("synonym", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.integer("synonym").notNullable();
                table.foreign("synonym").references("id").inTable("words");
                table.integer("level").notNullable();
                table.integer("written_by").notNullable();
                table.foreign("written_by").references("id").inTable("users");
                table.datetime("written_date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("comment", function (table) {
                table.increments("id").primary();
                table.integer("user").notNullable();
                table.foreign("user").references("id").inTable("users");
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.string("comment").notNullable();
                table.datetime("date").defaultTo(knex.fn.now()).notNullable();
                table.integer("reply");
            })
            .createTable("comment_like", function (table) {
                table.increments("id").primary();
                table.integer("comment").notNullable();
                table.foreign("comment").references("id").inTable("comment");
                table.integer("user").notNullable();
                table.foreign("user").references("id").inTable("users");
                table.boolean("dislike").defaultTo(false).notNullable();
                table.datetime("date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("view", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.integer("count").defaultTo(0).notNullable();
            })
            .createTable("word_like", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.integer("user").notNullable();
                table.foreign("user").references("id").inTable("users");
                table.boolean("dislike").defaultTo(false).notNullable();
                table.datetime("date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("history_of_actions", function (table) {
                table.increments("id").primary();
                table.integer("user").notNullable();
                table.foreign("user").references("id").inTable("users");
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.string("field").notNullable();
                table.string("old_value").notNullable();
                table.datetime("date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("images", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.uuid("image").notNullable();
                table.foreign("image").references("uuid").inTable("files");
                table.integer("written_by").notNullable();
                table.foreign("written_by").references("id").inTable("users");
                table.datetime("written_date").defaultTo(knex.fn.now()).notNullable();
            })
            .createTable("user_word", function (table) {
                table.increments("id").primary();
                table.integer("word").notNullable();
                table.foreign("word").references("id").inTable("words");
                table.integer("user").notNullable();
                table.foreign("user").references("id").inTable("users");
                table.datetime("created_date").defaultTo(knex.fn.now()).notNullable();
            })
    );
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return (
        knex.schema
            .dropTable("user_word")
            .dropTable("images")
            .dropTable("history_of_actions")
            .dropTable("word_like")
            .dropTable("view")
            .dropTable("comment_like")
            .dropTable("comment")
            .dropTable("synonym")
            .dropTable("definition")
            .dropTable("example")
            .dropTable("history")
            .dropTable("words")
            // .dropTable("view_level")
            .dropTable("word_status")
    );
}
