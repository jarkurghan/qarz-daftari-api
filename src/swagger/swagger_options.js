export default {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "swagger of OTIL APIs",
            version: "1.0",
        },
        servers: [{ url: "http://localhost:2006/" }, { url: "http://178.128.243.52:2006/" }],
    },
    apis: ["./src/swagger/UI/*.js"],
};
