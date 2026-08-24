import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import AuthProvider from "../context/AuthContext.jsx";
import useAuth from "../context/useAuth";
import { loginUser, registerUser } from "../services/authService";

vi.mock("../services/authService", () => ({
    loginUser: vi.fn(),
    registerUser: vi.fn(),
}));

function TestComponent() {
    const { user, token, isLoggedIn, login, register, logout } = useAuth();

    return (
        <div>
            <p data-testid="user">
                {user ? user.name : "No user"}
            </p>

            <p data-testid="token">
                {token || "No token"}
            </p>

            <p data-testid="logged-in">
                {isLoggedIn ? "Logged in" : "Logged out"}
            </p>

            <button
                type="button"
                onClick={() => login("khizer@test.com", "password123")}
            >
                Login
            </button>

            <button
                type="button"
                onClick={() =>
                    register("Khizer", "khizer@test.com", "password123")
                }
            >
                Register
            </button>

            <button type="button" onClick={logout}>
                Logout
            </button>
        </div>
    );
}

function renderAuth() {
    return render(
        <AuthProvider>
            <TestComponent />
        </AuthProvider>
    );
}

describe("AuthContext", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });
    it("starts logged out when localStorage is empty", () => {
        renderAuth();
        expect(screen.getByTestId("user")).toHaveTextContent("No user");
        expect(screen.getByTestId("token")).toHaveTextContent("No token");
        expect(screen.getByTestId("logged-in")).toHaveTextContent("Logged out");
    });
    it("restores the user and token from localStorage", () => {
        const user = { id: 1, name: "Khizer", email: "khizer@test.com", };
        localStorage.setItem("token", "saved-token");
        localStorage.setItem("user", JSON.stringify(user));
        renderAuth();
        expect(screen.getByTestId("user")).toHaveTextContent("Khizer");
        expect(screen.getByTestId("token")).toHaveTextContent("saved-token");
        expect(screen.getByTestId("logged-in")).toHaveTextContent("Logged in");
    });
    it("logs the user in and saves authentication data", async () => {
        const response = {
            token: "login-token",
            user: { id: 1, name: "Khizer", email: "khizer@test.com", },
        };
        loginUser.mockResolvedValue(response);
        renderAuth();
        fireEvent.click(screen.getByRole("button", { name: "Login" }));
        await waitFor(() => {
            expect(screen.getByTestId("logged-in")).toHaveTextContent("Logged in");
        });
        expect(screen.getByTestId("user")).toHaveTextContent("Khizer");
        expect(screen.getByTestId("token")).toHaveTextContent("login-token");
        expect(localStorage.getItem("token")).toBe("login-token");
        expect(JSON.parse(localStorage.getItem("user"))).toEqual(response.user);
    });
    it("registers the user and saves authentication data", async () => {
        const response = {
            token: "register-token",
            user: {
                id: 2, name: "New User", email: "new@test.com",
            },
        };
        registerUser.mockResolvedValue(response);
        renderAuth();
        fireEvent.click(screen.getByRole("button", { name: "Register" }));
        await waitFor(() => {
            expect(screen.getByTestId("logged-in")).toHaveTextContent("Logged in");
        });
        expect(screen.getByTestId("user")).toHaveTextContent("New User");
        expect(screen.getByTestId("token")).toHaveTextContent("register-token");
        expect(localStorage.getItem("token")).toBe("register-token");
    });
    it("logs the user out and clears authentication data", async () => {
        const user = { id: 1, name: "Khizer", email: "khizer@test.com" };
        localStorage.setItem("token", "saved-token");
        localStorage.setItem("user", JSON.stringify(user));
        renderAuth();
        expect(screen.getByTestId("logged-in")).toHaveTextContent("Logged in");
        fireEvent.click(screen.getByRole("button", { name: "Logout" }));
        await waitFor(() => {
            expect(screen.getByTestId("logged-in")).toHaveTextContent("Logged out");
        });
        expect(localStorage.getItem("token")).toBeNull();
        expect(localStorage.getItem("user")).toBeNull();
    });
    it("handles invalid saved user JSON", () => {
        localStorage.setItem("user", "invalid-json");
        localStorage.setItem("token", "saved-token");
        renderAuth();
        expect(screen.getByTestId("user")).toHaveTextContent("No user");
        expect(screen.getByTestId("token")).toHaveTextContent("saved-token");
        expect(localStorage.getItem("user")).toBeNull();
    });
});