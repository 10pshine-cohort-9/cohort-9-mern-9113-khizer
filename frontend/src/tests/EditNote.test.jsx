import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import EditNote from "../pages/EditNote";
import { getNotes } from "../services/noteService";

vi.mock("../context/useAuth", () => ({
  default: () => ({
    isLoggedIn: true,
  }),
}));

vi.mock("../services/noteService", () => ({
  getNotes: vi.fn(),
  updateNote: vi.fn(),
}));

describe("EditNote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading while the note is being fetched", () => {
    getNotes.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={["/notes/edit/1"]}>
        <Routes>
          <Route path="/notes/edit/:id" element={<EditNote />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading note...")).toBeInTheDocument();
  });

  it("shows the note editor when the note is found", async () => {
    getNotes.mockResolvedValue([
      {
        id: 1,
        title: "My note",
        content: "<p>This is my note.</p>",
      },
    ]);
    render(
      <MemoryRouter initialEntries={["/notes/edit/1"]}>
        <Routes>
          <Route path="/notes/edit/:id" element={<EditNote />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Make a change" })
      ).toBeInTheDocument();
    });
    expect(screen.getByDisplayValue("My note")).toBeInTheDocument();
  });

  it("shows an error when the note does not exist", async () => {
    getNotes.mockResolvedValue([]);
    render(
      <MemoryRouter initialEntries={["/notes/edit/1"]}>
        <Routes>
          <Route path="/notes/edit/:id" element={<EditNote />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Note not found")).toBeInTheDocument();
    });
  });
});