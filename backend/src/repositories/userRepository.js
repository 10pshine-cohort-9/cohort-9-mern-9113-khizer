const { pool } = require("../config/db");

async function findUserByEmail(email){
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0];
    } catch(error){
        console.error("Error finding user");
        throw error;

    }
}

module.exports = {
    findUserByEmail
};