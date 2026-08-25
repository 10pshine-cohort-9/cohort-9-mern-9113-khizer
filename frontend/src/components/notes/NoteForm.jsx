import { useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function NoteForm({ note, onSave, onCancel }) {
    const [title, setTitle] = useState(note?.title || "");
    const [saving, setSaving] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: note?.content || "",
        editorProps: {
            attributes: {
                class: "note-editor-content",
            },
        },
    });

    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor?.isActive("bold") ?? false,
            isItalic: ctx.editor?.isActive("italic") ?? false,
            isBulletList: ctx.editor?.isActive("bulletList") ?? false,
            isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        }),
    });

    async function handleSubmit(e) {
        e.preventDefault();

        if (!editor) {
            return;
        }

        const content = editor.getHTML();

        if (editor.getText().trim() === "") {
            return;
        }

        setSaving(true);

        try {
            await onSave(title, content);
        } finally {
            setSaving(false);
        }
    }

    function toggleBold() {
        editor?.chain().focus().toggleBold().run();
    }

    function toggleItalic() {
        editor?.chain().focus().toggleItalic().run();
    }

    function toggleBulletList() {
        editor?.chain().focus().toggleBulletList().run();
    }

    function toggleOrderedList() {
        editor?.chain().focus().toggleOrderedList().run();
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <label htmlFor="note-title">
                <span>Title</span>
                <input
                    id="note-title"
                    type="text"
                    value={title}
                    placeholder="Give your note a title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={255}
                />
            </label>

            <div className="note-form-field">
                <span className="note-form-label">Note</span>
                <div className="rich-text-editor">
                    <div className="editor-toolbar">
                        <button
                            type="button"
                            onClick={toggleBold}
                            disabled={!editor}
                            className={editorState?.isBold ? "is-active" : ""}
                        >
                            Bold
                        </button>

                        <button
                            type="button"
                            onClick={toggleItalic}
                            disabled={!editor}
                            className={editorState?.isItalic ? "is-active" : ""}
                        >
                            Italic
                        </button>

                        <button
                            type="button"
                            onClick={toggleBulletList}
                            disabled={!editor}
                            className={editorState?.isBulletList ? "is-active" : ""}
                        >
                            Bullets
                        </button>

                        <button
                            type="button"
                            onClick={toggleOrderedList}
                            disabled={!editor}
                            className={editorState?.isOrderedList ? "is-active" : ""}
                        >
                            Numbered
                        </button>
                    </div>

                    <EditorContent editor={editor} />
                </div>
            </div>

            <div className="note-form-actions">
                <button
                    type="button"
                    className="button button-secondary"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="button button-primary"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save note"}
                </button>
            </div>
        </form>
    );
}

export default NoteForm;