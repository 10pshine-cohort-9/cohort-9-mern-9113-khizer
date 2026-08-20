import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/notes/NoteForm";
import useAuth from "../context/useAuth";
import { createNote } from "../services/noteService";

function NoteEditor() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSave(title, content) {
    setError("");

    try {
      await createNote(title, content);
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

  return (
    <main className="note-editor-page">
      <div className="note-editor-head">
        <span className="eyebrow">New note</span>
        <h1>Write something</h1>
        <p>Put down whatever is on your mind.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <NoteForm onSave={handleSave} onCancel={handleCancel} />
    </main>
  );
}

export default NoteEditor;