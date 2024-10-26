// Update with your config settings.
import env from "./../environment/_env_module.js";
env("../../");
env();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    development: {
        client: "postgresql",
        connection: {
            // connectionString: process.env.DATABASE_URL,
            connectionString: "postgresql://qd_db_user:ZCwFRm9WGFJ61Z199xhUIykL6NMPz9E3@dpg-cse90vu8ii6s738ut7v0-a.singapore-postgres.render.com:5432/qd_db",
            ssl: { rejectUnauthorized: false }
        },
        pool: { min: 2, max: 10 },
    },
    production: {
        client: "postgresql",
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
        pool: { min: 2, max: 10 },
    },
};
