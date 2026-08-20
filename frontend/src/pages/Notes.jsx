import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../components/notes/NoteCard";
import useAuth from "../context/useAuth";
import { deleteNote, getNotes } from "../services/noteService";

function Notes() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotes() {
      try {
        const result = await getNotes();
        setNotes(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteNote(id);

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(note) {
    navigate(`/notes/edit/${note.id}`);
  }

  function handleLogout() {
    logout();
  }

  return (
    <main className="notes-page">
      <div className="notes-top">
        <div>
          <span className="eyebrow">Your space</span>
          <h1>Your notes</h1>
          <p>Welcome back, {user?.name || "there"}.</p>
        </div>

        <div className="notes-actions">
          <Link to="/notes/new" className="button button-primary">
            New note
          </Link>

          <button
            type="button"
            className="button button-secondary"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      {loading ? (
        <div className="empty-notes">
          <p>Loading your notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="empty-notes">
          <h2>No notes yet</h2>
          <p>
            Start with something small. You can always come back and build on
            it.
          </p>

          <Link to="/notes/new" className="button button-primary">
            Write a note
          </Link>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Notes;