const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!JWT_SECRET || JWT_SECRET === "jwt_secret") {
    throw new Error(
        "JWT_SECRET is missing or using an insecure default value."
    );
}
if (!JWT_EXPIRES_IN) {
    throw new Error(
        "JWT_EXPIRES_IN is not configured."
    );
}

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN
        }
    );
}

module.exports = {
    generateToken
};