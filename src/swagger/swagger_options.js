export default {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "swagger of OTIL APIs",
            version: "1.0",
        },
        servers: [{ url: "http://localhost:1009/" }, { url: "http://178.128.243.52:1009/" }],
    },
    apis: ["./src/swagger/UI/*.js"],
};
