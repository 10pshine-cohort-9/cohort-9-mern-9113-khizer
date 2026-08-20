import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../components/notes/NoteForm";
import useAuth from "../context/useAuth";
import { getNotes, updateNote } from "../services/noteService";

function EditNote() {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNote() {
      try {
        const notes = await getNotes();

        const selectedNote = notes.find(
          (currentNote) => String(currentNote.id) === id
        );

        if (!selectedNote) {
          setError("Note not found");
          return;
        }

        setNote(selectedNote);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadNote();
  }, [id]);

  async function handleSave(title, content) {
    try {
      await updateNote(id, title, content);
      navigate("/notes");
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  function handleCancel() {
    navigate("/notes");
  }

  if (!isLoggedIn) {
    return null;
  }

  if (loading) {
    return (
      <main className="note-editor-page">
        <p>Loading note...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="note-editor-page">
        <p className="form-error">{error}</p>
      </main>
    );
  }

  return (
    <main className="note-editor-page">
      <div className="note-editor-head">
        <span className="eyebrow">Edit note</span>
        <h1>Make a change</h1>
        <p>Update your note and save it when you're ready.</p>
      </div>

      <NoteForm
        key={note.id}
        note={note}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </main>
  );
}

export default EditNote;