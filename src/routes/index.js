import express from "express";
import user from "./auth/index.js";
import file from "./file/index.js";
import journal from "./journal/index.js";
const app = express();

app.use("/qd/v1/api/auth", user);
app.use("/qd/v1/api/journal", journal);
app.use("/qd/v1/api/file", file);

export default app;
