// Update with your config settings.
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("../../.env") });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    development: {
        client: "postgresql",
        connection: {
            connectionString: process.env.DATABASE_URL,
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
