import express from "express";
import user from "./auth/index.js";
// import word from "./word/index.js";
// import resource from "./resource/index.js";
// import language from "./language/index.js";
// import file from "./file/index.js";
// import free from "./free/index.js";
// import auth from "../middleware/auth.js";
const app = express();

app.use("/qd/v1/api/auth", user);
// app.use("/otil/v1/api/word", auth, word);
// app.use("/otil/v1/api/resource", resource);
// app.use("/otil/v1/api/language", auth, language);
// app.use("/otil/v1/api/file", file);
// app.use("/lugat", free);

export default app;
