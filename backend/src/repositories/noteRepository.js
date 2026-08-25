const { pool } = require("../config/db");
const {logger }=require("../utils/logger");

async function getNotesByUser(userId) {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM notes WHERE user_id = ?",
            [userId]
        );

        return rows;
    } catch (error) {
        logger.error(error,"Error getting notes")
        throw error;
    }
}

async function createNote(userId, title, content) {
    try {
        const [result] = await pool.execute(
            `INSERT INTO notes (user_id, title, content)
             VALUES (?, ?, ?)`,
            [userId, title, content]
        );

        return result.insertId;
    } catch (error) {
        logger.error(error,"Error creating notes")
        throw error;
    }
}

async function createImportedNote(userId, title, content) {
    try {
        const [result] = await pool.execute(
            `INSERT INTO notes (user_id, title, content)
             VALUES (?, ?, ?)`,
            [userId, title, content]
        );

        return result.insertId;
    } catch (error) {
        logger.error(error, "Error importing note");
        throw error;
    }
}

async function updateNote(noteId, userId, title, content) {
    try {
        const [result] = await pool.execute(
            `UPDATE notes
             SET title = ?, content = ?
             WHERE id = ? AND user_id = ?`,
            [title, content, noteId, userId]
        );

        return result.affectedRows;
    } catch (error) {
        logger.error(error,"Error updating notes")
        throw error;
    }
}

async function deleteNote(noteId, userId) {
    try {
        const [result] = await pool.execute(
            `DELETE FROM notes
             WHERE id = ? AND user_id = ?`,
            [noteId, userId]
        );

        return result.affectedRows;
    } catch (error) {
        logger.error(error,"Error deleting notes")
        throw error;
    }
}

module.exports = {
    getNotesByUser,
    createNote,
    createImportedNote,
    updateNote,
    deleteNote
};