import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import useAuth from "../context/useAuth";

vi.mock("../context/useAuth", () => ({
  default: vi.fn(),
}));

function renderRoute(isLoggedIn) {
  useAuth.mockReturnValue({
    isLoggedIn,
  });

  return render(
    <MemoryRouter initialEntries={["/notes"]}>
      <Routes>
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <h1>Notes Dashboard</h1>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<h1>Login Page</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows protected content when the user is logged in", () => {
    renderRoute(true);
    expect(screen.getByRole("heading", { name: "Notes Dashboard" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Login Page" })).not.toBeInTheDocument();
  });
  it("redirects logged-out users to the login page", () => {
    renderRoute(false);
    expect(screen.getByRole("heading", { name: "Login Page" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Notes Dashboard" })).not.toBeInTheDocument();
  });
});