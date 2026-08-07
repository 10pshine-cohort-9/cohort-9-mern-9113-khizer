const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "jwt_secret") {
    throw new Error("A secure JWT_SECRET must be provided.");
}

if (!process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_EXPIRES_IN must be provided.");
}

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
}

function verifyToken(token) {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
}

module.exports = {
    generateToken,
    verifyToken
};