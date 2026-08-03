const Fastify = require("fastify");
const logger = require("./plugins/logger");

const app = Fastify({
    logger: true
});
app.register(logger);

app.get("/check", (request, reply) => {
    request.log.info("Check done");
    return {
        status: "OK",
        message: "Notes App api is working"
    };
});


module.exports = app;