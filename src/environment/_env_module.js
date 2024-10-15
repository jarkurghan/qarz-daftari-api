import { resolve } from "path";
import { config } from "dotenv";

export default function envfunction(path = "./") {
    let alfa;
    switch (process.env.NODE_ENV) {
        case "production":
            alfa = "production";
            break;
        case "staging":
            alfa = "staging";
            break;
        case "test":
            alfa = "test";
            break;
        case "development":
            alfa = "development";
            break;
        case undefined:
            alfa = "development";
            break;
        default:
            alfa = "";
            console.log("Bunday env-module mavjud emas");
    }

    return config({ path: resolve(`${path}src/environment/${alfa}.env`) });
}
