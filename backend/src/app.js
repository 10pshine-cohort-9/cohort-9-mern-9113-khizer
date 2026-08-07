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

app.get("/check", (request, reply) => {
    request.log.info("Check done");
    return {
        status: "OK",
        message: "Notes App api is working"
    };
});

module.exports = app;