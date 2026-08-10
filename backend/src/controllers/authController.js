const { registerUser, loginUser } = require("../services/authService");

async function register(request, reply) {
    try {
        const { name, email, password } = request.body;
        const result = await registerUser(
            name,email,password
        );
        return reply.code(201).send(result);
    } catch (error) {
        request.log.error(error);
        if (error.message === "User already exists") {
            return reply.code(400).send({
                message: error.message
            });
        }
        return reply.code(500).send({
            message: "Internal server error"
        });
    }
}

async function login(request, reply) {
    try {
        const { email, password } = request.body;
        const result = await loginUser(
            email,
            password
        );
        return reply.send(result);
    } catch (error) {
        request.log.error(error);
        if (error.message === "Invalid email or password") {
            return reply.code(401).send({
                message: error.message
            });
        }
        return reply.code(500).send({
            message: "Internal server error"
        });
    }
}

module.exports = {
    register,
    login
};