import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import NoteForm from "../components/notes/NoteForm";

vi.mock("@tiptap/react", () => ({
  EditorContent: () => <div data-testid="editor">Note editor</div>,
  useEditor: () => ({
    getHTML: () => "<p>This is my note.</p>",
    getText: () => "This is my note.",
    chain: () => ({
      focus: () => ({
        toggleBold: () => ({ run: vi.fn() }),
        toggleItalic: () => ({ run: vi.fn() }),
        toggleBulletList: () => ({ run: vi.fn() }),
        toggleOrderedList: () => ({ run: vi.fn() }),
      }),
    }),
  }),
  useEditorState: () => ({
    isBold: false,
    isItalic: false,
    isBulletList: false,
    isOrderedList: false,
  }),
}));

vi.mock("@tiptap/starter-kit", () => ({
  default: {},
}));

describe("NoteForm", () => {
  it("shows the title and buttons", () => {
    render(
      <NoteForm
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.getByPlaceholderText("Give your note a title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save note" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("calls onCancel when Cancel is clicked", () => {
    const onCancel = vi.fn();
    render(
      <NoteForm
        onSave={vi.fn()}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("calls onSave when a title and note are entered", async () => {
    const onSave = vi.fn();
    render(
      <NoteForm
        onSave={onSave}
        onCancel={vi.fn()}
      />
    );
    fireEvent.change(
      screen.getByPlaceholderText("Give your note a title"),
      {target: { value: "My note" },}
    );
    fireEvent.click(screen.getByRole("button", { name: "Save note" }));
    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        "My note",
        "<p>This is my note.</p>"
      );
    });
  });
});