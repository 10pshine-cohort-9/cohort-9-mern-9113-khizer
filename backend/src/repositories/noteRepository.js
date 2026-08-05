const { pool } = require("../config/db");
const logger = require("../utils/logger");

async function getNotesByUser(userId){
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM notes WHERE user_id = ?",
            [userId]
        );
        return rows;
    } catch(error){
        logger.error(error, "Error getting notes");
        throw error;

    }
}

module.exports = {
    getNotesByUser
};