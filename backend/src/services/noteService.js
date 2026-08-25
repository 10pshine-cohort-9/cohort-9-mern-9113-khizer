const {getNotesByUser,createNote,updateNote,deleteNote,createImportedNote} = require("../repositories/noteRepository");
const { pool } = require("../config/db");

async function getUserNotes(userId) {
    try{
        return await getNotesByUser(userId);
    }catch (error) {
        throw error;
    }
}


async function addNote(userId, title, content) {
    try {
        const noteId = await createNote(userId, title, content);
        return {id: noteId,title,content};
    }catch (error){
        throw error;
    }
}

async function editNote(noteId, userId, title, content) {
    try {
        const updated = await updateNote(noteId,userId,title,content);
        if (!updated){
            throw new Error("Note not found");
        }
        return {
            message: "Note updated successfully"
        };
    }catch (error){
        throw error;
    }
}

async function removeNote(noteId, userId) {
    try {
        const deleted = await deleteNote(noteId, userId);
        if (!deleted){
            throw new Error("Note not found");
        }
        return {
            message: "Note deleted successfully"
        };
    }catch (error){
        throw error;
    }
}

async function addImportedNotes(userId, notes) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const importedNotes = [];
        for (const note of notes) {
            const id = await createImportedNote(
                connection,
                userId,
                note.title,
                note.content
            );
            importedNotes.push({
                id,
                title: note.title,
                content: note.content
            });
        }
        await connection.commit();
        return importedNotes;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {getUserNotes,addNote,editNote,removeNote,addImportedNotes};