import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./src/routes/index.js";
import env from "./src/environment/_env_module.js";
const app = express();
env();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options1 from "./src/swagger/swagger_options.js";
if (process.env.NODE_ENV !== "production") app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options1)));

app.use("/", router);
app.listen(process.env.PORT, () => {
    console.log(`Ilova ishga tushdi: http://localhost:${process.env.PORT || 1009}`);
});
