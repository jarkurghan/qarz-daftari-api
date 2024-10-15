const environment = process.env.NODE_ENV || "development";
import knex from "knex";
import knexfile from "./knexfile.js";
const db = knex(knexfile[environment]);
export default db;
