require("dotenv").config();
const { expect } = require("chai");
const app = require("../src/app");

describe("Note Routes", () => {
    it("should reject unauthenticated requests to get notes", async () => {
        const response = await app.inject({
            method: "GET",
            url: "/api/notes"
        });
        expect(response.statusCode).to.equal(401);
    });
    it("should reject creating a note without authentication", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/notes",
            payload: {
                title: "Test Note",
                content: "Test content"
            }
        });
        expect(response.statusCode).to.equal(401);
    });
    it("should reject updating a note with an invalid id", async () => {
        const response = await app.inject({
            method: "PUT",
            url: "/api/notes/0",
            payload: {
                title: "Updated Note",
                content: "Updated content"
            }
        });
        expect(response.statusCode).to.equal(400);
    });
    it("should reject deleting a note with an invalid id", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: "/api/notes/0"
        });
        expect(response.statusCode).to.equal(400);
    });
    it("should reject creating a note when required fields are missing", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/notes",
            payload: {}
        });
        expect(response.statusCode).to.equal(400);
    });
});