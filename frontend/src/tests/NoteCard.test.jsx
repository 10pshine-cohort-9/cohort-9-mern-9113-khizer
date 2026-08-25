import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import NoteCard from "../components/notes/NoteCard";

describe("NoteCard", () => {
  const note = {id: 1,title: "My first note",content: "<p>This is my note.</p>",};
  it("shows the note title and content", () => {
    render(<NoteCard note={note} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "My first note" })).toBeInTheDocument();
    expect(screen.getByText("This is my note.")).toBeInTheDocument();
  });
  it("calls onEdit when Edit is clicked", () => {
    const onEdit = vi.fn();
    render(<NoteCard note={note} onEdit={onEdit} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledWith(note);
  });
  it("calls onDelete with the note id", () => {
    const onDelete = vi.fn();
    render(<NoteCard note={note} onEdit={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});