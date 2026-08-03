const fp = require("fastify-plugin");

function logger(fastify) {
    fastify.addHook("onRequest", (request) => {
        request.log.info(
            `${request.method} ${request.url}`
        );
    });

}


module.exports = fp(logger);