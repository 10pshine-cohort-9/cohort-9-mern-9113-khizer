const fp = require("fastify-plugin");

async function logger(fastify) {
    fastify.addHook("onRequest", async (request) => {
        try {
            request.log.info(`${request.method} ${request.url}`);
        } catch (error) {
            // Ignore logging errors
        }
    });

    fastify.addHook("onResponse", async (request, reply) => {
        try {
            request.log.info(
                `${request.method} ${request.url} - ${reply.statusCode}`
            );
        } catch (error) {
            // Ignore logging errors
        }
    });
}

module.exports = fp(logger);
