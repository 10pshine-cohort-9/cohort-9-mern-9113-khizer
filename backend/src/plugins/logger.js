const fp = require("fastify-plugin");

async function logger(fastify) {
    fastify.addHook("onRequest", async (request, reply) => {
        request.log.info(`${request.method} ${request.url}`);
    });
}

module.exports = fp(logger);