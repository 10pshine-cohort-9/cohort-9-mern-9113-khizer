const Fastify = require("fastify");
const logger = require("./plugins/logger");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = Fastify({
    logger: true
});
app.register(logger);
app.register(authRoutes, {
    prefix: "/api/auth"
});
app.register(noteRoutes, {
    prefix: "/api/notes"
});
app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
        request.log.warn(error);
        return reply.code(400).send({
            message: "Invalid request data"
        });
    }
    request.log.error(error);
    return reply.code(500).send({
        message: "Internal server error"
    });
});

app.get("/check", (request, reply) => {
    request.log.info("Check done");
    return {
        status: "OK",
        message: "Notes App api is working"
    };
});

module.exports = app;
