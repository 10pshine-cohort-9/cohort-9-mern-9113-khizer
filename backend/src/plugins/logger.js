const fp = require("fastify-plugin");

async function logger(fastify) {
    fastify.addHook("onRequest", async (request) => {
        request.log.info(`${request.method} ${request.url}`);
    });

    fastify.addHook("onResponse", async (request, reply) => {
        request.log.info(
            `${request.method} ${request.url} - ${reply.statusCode}`
        );
    });
}

module.exports = fp(logger);
