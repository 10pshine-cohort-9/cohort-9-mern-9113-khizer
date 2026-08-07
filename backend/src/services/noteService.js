const {getNotesByUser,createNote,updateNote,deleteNote} = require("../repositories/noteRepository");

async function getUserNotes(userId) {
    return await getNotesByUser(userId);
}

async function addNote(userId, title, content) {
    const noteId = await createNote(userId,title,content);
    return {id: noteId,title,content};
}

async function editNote(noteId, userId, title, content) {
    const updated = await updateNote(noteId,userId,title,content);
    if (!updated) {
        throw new Error("Note not found");
    }
    return {
        message: "Note updated successfully"
    };
}

async function removeNote(noteId, userId) {
    const deleted = await deleteNote(noteId,userId);
    if (!deleted) {
        throw new Error("Note not found");
    }
    return {
        message: "Note deleted successfully"
    };
}

module.exports = {
    getUserNotes,
    addNote,
    editNote,
    removeNote
};