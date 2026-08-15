require("dotenv").config();

const { expect } = require("chai");
const { generateToken, verifyToken } = require("../src/utils/jwt");

describe("JWT Utility", () => {
    const user = {id: 1,email: "test@example.com"};
    it("should generate a valid token", () => {
        const token = generateToken(user);
        expect(token).to.be.a("string");
        expect(token).to.not.equal("");
    });
    it("should verify a valid token and return the user id", () => {
        const token = generateToken(user);
        const decoded = verifyToken(token);
        expect(decoded.id).to.equal(user.id);
    });
    it("should reject an invalid token", () => {
        expect(() => verifyToken("invalid-token")).to.throw();
    });
});