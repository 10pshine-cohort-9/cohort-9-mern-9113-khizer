import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../components/notes/NoteCard";
import useAuth from "../context/useAuth";
import { createNote, deleteNote, getNotes } from "../services/noteService";

function Notes() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("updated-desc");
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
  async function handleImport(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    try {
      const text = await file.text();
      const notes = JSON.parse(text);
      for (const note of notes) {
        await createNote(note.title, note.content);
      }
      setNotes(await getNotes());
    } catch (err) {
      setError("Failed to import notes.");
    }
    e.target.value = "";
  }
  function handleEdit(note) {
    navigate(`/notes/edit/${note.id}`);
  }
  function handleLogout() {
    logout();
  }
  function handleExport() {
    const exportNotes = notes.map((note) => ({
      title: note.title,
      content: note.content,
    }));

    const blob = new Blob(
      [JSON.stringify(exportNotes, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "my-notes.json";
    link.click();

    URL.revokeObjectURL(url);
  }
  const filteredAndSortedNotes = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm)
    );
    return [...filteredNotes].sort((a, b) => {
      switch (sortBy) {
        case "updated-desc":
          return new Date(b.updated_at) - new Date(a.updated_at);
        case "updated-asc":
          return new Date(a.updated_at) - new Date(b.updated_at);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [notes, search, sortBy]);
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
          <label className="button button-secondary import-button">
            Import
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImport}
              hidden
            />
          </label>
          <button
            type="button"
            className="button button-secondary"
            onClick={handleExport}
            disabled={notes.length === 0}
          >
            Export
          </button>
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
            Start with something new. You can come back and build it.
          </p>
          <Link to="/notes/new" className="button button-primary">
            Write a note
          </Link>
        </div>
      ) : (
        <>
          <div className="notes-controls">
            <div className="notes-search">
              <label htmlFor="note-search">Search notes</label>
              <input
                id="note-search"
                type="search"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="notes-sort">
              <label htmlFor="note-sort">Sort by</label>
              <select
                id="note-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="updated-desc">Newest updated</option>
                <option value="updated-asc">Oldest updated</option>
                <option value="title-asc">Title A–Z</option>
                <option value="title-desc">Title Z–A</option>
              </select>
            </div>
          </div>
          {filteredAndSortedNotes.length === 0 ? (
            <div className="empty-notes notes-no-results">
              <h2>No matching notes</h2>
              <p>Try searching for a different title.</p>
            </div>
          ) : (
            <div className="notes-list">
              {filteredAndSortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Notes;