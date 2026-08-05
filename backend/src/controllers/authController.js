const {registerUser,loginUser} = require("../services/authService");

async function register(request, reply) {
    try {
        const { name, email, password } = request.body;
        const result = await registerUser(
            name,email,password
        );
        return reply.code(201).send(result);
    } catch (error) {
        return reply.code(400).send({
            message: error.message
        });
    }
}

async function login(request, reply) {
    try {
        const { email, password } = request.body;

        const result = await loginUser(
            email,password
        );
        return reply.send(result);
    } catch (error) {
        return reply.code(401).send({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
};