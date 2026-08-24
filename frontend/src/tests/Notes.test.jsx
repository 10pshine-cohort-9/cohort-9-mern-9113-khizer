import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Notes from "../pages/Notes";

const getNotes = vi.fn();
const deleteNote = vi.fn();
const logout = vi.fn();

vi.mock("../services/noteService", () => ({
  getNotes: (...args) => getNotes(...args),
  deleteNote: (...args) => deleteNote(...args),
}));

vi.mock("../context/useAuth", () => ({
  default: () => ({
    user: { name: "Khizer" },
    logout,
  }),
}));

describe("Notes", () => {
  it("shows the notes after loading", async () => {
    getNotes.mockResolvedValue([
      {
        id: 1,
        title: "First note",
        content: "<p>Hello</p>",
      },
    ]);
    render(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading your notes...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "First note" })).toBeInTheDocument();
    });
    expect(screen.getByText("Welcome back, Khizer.")).toBeInTheDocument();
  });
  it("shows an empty message when there are no notes", async () => {
    getNotes.mockResolvedValue([]);
    render(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "No notes yet" })).toBeInTheDocument();
    });
  });
  it("signs the user out when Sign out is clicked", async () => {
    getNotes.mockResolvedValue([]);
    render(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    expect(logout).toHaveBeenCalled();
  });
});