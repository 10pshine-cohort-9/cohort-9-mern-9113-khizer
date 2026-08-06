const { register, login } = require("../controllers/authController");

async function authRoutes(fastify) {
    fastify.post("/register",{
            schema: {
                body: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            minLength: 2,
                            maxLength: 100
                        },
                        email: {
                            type: "string",
                            format: "email"
                        },
                        password: {
                            type: "string",
                            minLength: 8,
                            maxLength: 100
                        }
                    }
                }
            }
        },
        register
    );

    fastify.post("/login", login);
}

module.exports = authRoutes;