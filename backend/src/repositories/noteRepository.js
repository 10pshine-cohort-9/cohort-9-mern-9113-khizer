const { pool } = require("../config/db");


async function getNotesByUser(userId) {

    const [rows] = await pool.execute(
        "SELECT * FROM notes WHERE user_id = ?",
        [userId]
    );

    return rows;
}


module.exports = {
    getNotesByUser
};