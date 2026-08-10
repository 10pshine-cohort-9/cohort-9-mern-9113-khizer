const argon2 = require("argon2");
const { findUserByEmail, createUser } = require("../repositories/userRepository");
const { generateToken } = require("../utils/jwt");
const logger = require("../utils/logger");

async function registerUser(name, email, password) {
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await argon2.hash(password);
        const userId = await createUser(
            name,email,hashedPassword
        );
        const token = generateToken({
            id: userId,email
        });
        return {
            token,
            user: {
                id: userId,
                name,
                email
            }
        };
    }
    catch (error) {
        logger.error(error, "Error registering user");
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const passwordMatched = await argon2.verify(
            user.password,password
        );
        if (!passwordMatched) {
            throw new Error("Invalid email or password");
        }
        const token = generateToken({
            id: user.id,email: user.email
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
    catch (error) {
        logger.error(error, "Error logging in user");
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser
};