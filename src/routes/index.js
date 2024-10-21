import express from "express";
import user from "./auth/index.js";
import file from "./file/index.js";
const app = express();

app.use("/qd/v1/api/auth", user);
app.use("/qd/v1/api/file", file);

export default app;
