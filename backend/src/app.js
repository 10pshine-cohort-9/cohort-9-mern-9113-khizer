const Fastify = require("fastify");
const logger = require("./plugins/logger");
const authRoutes = require("./routes/authRoutes");

const app = Fastify({
    logger: true
});
app.register(logger);
app.register(authRoutes, {
    prefix: "/api/auth"
});

app.get("/check", (request, reply) => {
    request.log.info("Check done");
    return {
        status: "OK",
        message: "Notes App api is working"
    };
});

module.exports = app;