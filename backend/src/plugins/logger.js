const fp = require("fastify-plugin");

async function logger(fastify) {
    fastify.addHook("onRequest", async (request) => {
        request.log.info(
            `${request.method} ${request.url}`
        );
    });

}


module.exports = fp(logger);