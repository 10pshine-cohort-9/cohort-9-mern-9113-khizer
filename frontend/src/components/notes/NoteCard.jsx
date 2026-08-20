function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="note-card">
      <div className="note-card-top">
        <h2>{note.title}</h2>

        <div className="note-card-actions">
          <button type="button" onClick={() => onEdit(note)}>
            Edit
          </button>

          <button type="button" onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>

      <div
        className="note-card-content"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </article>
  );
}

export default NoteCard;