import { describe, expect, it, vi } from "vitest";
import apiRequest from "../services/api";
import {getNotes,createNote,updateNote,deleteNote,} from "../services/noteService";

vi.mock("../services/api", () => ({
  default: vi.fn(),
}));

describe("noteService", () => {
  it("gets all notes", async () => {
    apiRequest.mockResolvedValue([{ id: 1, title: "First note" }]);
    const result = await getNotes();
    expect(apiRequest).toHaveBeenCalledWith("/api/notes");
    expect(result).toEqual([{ id: 1, title: "First note" }]);
  });

  it("creates a note", async () => {
    apiRequest.mockResolvedValue({ id: 1 });
    await createNote("My note", "Hello");
    expect(apiRequest).toHaveBeenCalledWith("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: "My note",
        content: "Hello",
      }),
    });
  });

  it("updates a note", async () => {
    apiRequest.mockResolvedValue({ id: 1 });
    await updateNote(1, "Updated note", "Updated content");
    expect(apiRequest).toHaveBeenCalledWith("/api/notes/1", {
      method: "PUT",
      body: JSON.stringify({
        title: "Updated note",
        content: "Updated content",
      }),
    });
  });

  it("deletes a note", async () => {
    apiRequest.mockResolvedValue({ message: "Deleted" });
    await deleteNote(1);
    expect(apiRequest).toHaveBeenCalledWith("/api/notes/1", {
      method: "DELETE",
    });
  });
});