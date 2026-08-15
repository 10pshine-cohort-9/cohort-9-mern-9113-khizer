require("dotenv").config();
const { expect } = require("chai");
const app = require("../src/app");

describe("Authentication Routes", () => {
    it("should reject registration when required fields are missing", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/auth/register",
            payload: {
                email: "test@example.com"
            }
        });
        expect(response.statusCode).to.equal(400);
        expect(response.json()).to.have.property("message");
    });
    it("should reject registration when email is invalid", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/auth/register",
            payload: {
                name: "Test User",
                email: "invalid-email",
                password: "password123"
            }
        });
        expect(response.statusCode).to.equal(400);
        expect(response.json()).to.have.property("message");
    });
    it("should reject registration when password is too short", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/auth/register",
            payload: {
                name: "Test User",
                email: "test@example.com",
                password: "123"
            }
        });
        expect(response.statusCode).to.equal(400);
        expect(response.json()).to.have.property("message");
    });
});