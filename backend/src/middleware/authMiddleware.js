const { verifyToken } = require("../utils/jwt");

async function authMiddleware(request, reply) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.code(401).send({
                message: "Authorization token is required"
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = verifyToken(token);
        request.user = decoded;
    } catch (error) {
        request.log.error(error);
        return reply.code(401).send({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;