const {getUserNotes,addNote,editNote,removeNote,addImportedNotes} = require("../services/noteService");

async function getNotes(request, reply) {
    try {
        const notes = await getUserNotes(request.user.id);
        return reply.send(notes);
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            message: "Internal server error"
        });
    }
}

async function createNote(request, reply) {
    try {
        const { title, content } = request.body;
        const note = await addNote(
            request.user.id,
            title,
            content
        );
        return reply.code(201).send(note);
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            message: "Internal server error"
        });
    }
}

async function updateNote(request, reply) {
    try {
        const noteId = Number(request.params.id);
        const { title, content } = request.body;
        const result = await editNote(noteId,request.user.id,title,content);
        return reply.send(result);
    } catch (error) {
        request.log.error(error);
        if (error.message === "Note not found") {
            return reply.code(404).send({
                message: error.message
            });
        }
        return reply.code(500).send({
            message: "Internal server error"
        });
    }
}

async function deleteNote(request, reply) {
    try {
        const noteId = Number(request.params.id);
        const result = await removeNote(
            noteId,
            request.user.id
        );
        return reply.send(result);
    } catch (error) {
        request.log.error(error);
        if (error.message === "Note not found") {
            return reply.code(404).send({
                message: error.message
            });
        }
        return reply.code(500).send({
            message: "Internal server error"
        });
    }
}

async function importNotes(request, reply) {
    try {
        const { notes } = request.body;
        const importedNotes = await addImportedNotes(
            request.user.id,
            notes
        );
        return reply.code(201).send(importedNotes);
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    importNotes
};