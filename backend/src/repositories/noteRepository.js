const { pool } = require("../config/db");

async function getNotesByUser(userId){
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM notes WHERE user_id = ?",
            [userId]
        );
        return rows;
    } catch(error){
        console.error("Error getting notes");
        throw error;

    }
}

module.exports = {
    getNotesByUser
};