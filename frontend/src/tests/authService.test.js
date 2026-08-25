import { describe, expect, it, vi, beforeEach } from "vitest";
import apiRequest from "../services/api";
import { loginUser, registerUser } from "../services/authService";

vi.mock("../services/api", () => ({
    default: vi.fn(),
}));

describe("authService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it("registerUser sends the correct registration request", async () => {
        const response = {
            token: "test-token", user: { id: 1, name: "Khizer", email: "khizer@test.com", },
        };
        apiRequest.mockResolvedValue(response);
        const result = await registerUser("Khizer", "khizer@test.com", "password123");
        expect(apiRequest).toHaveBeenCalledWith("/api/auth/register", { method: "POST", body: JSON.stringify({ name: "Khizer", email: "khizer@test.com", password: "password123", }), });
        expect(result).toEqual(response);
    });
    it("loginUser sends the correct login request", async () => {
        const response = {
            token: "test-token",
            user: { id: 1, name: "Khizer", email: "khizer@test.com", },
        };
        apiRequest.mockResolvedValue(response);
        const result = await loginUser("khizer@test.com", "password123");
        expect(apiRequest).toHaveBeenCalledWith("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email: "khizer@test.com", password: "password123", }),
        });
        expect(result).toEqual(response);
    });
    it("propagates API errors", async () => {
        const error = new Error("Invalid credentials");
        apiRequest.mockRejectedValue(error);
        await expect(loginUser("wrong@test.com", "wrongpassword")).rejects.toThrow("Invalid credentials");
    });
});