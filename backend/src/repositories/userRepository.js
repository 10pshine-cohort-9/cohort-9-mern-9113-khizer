const { pool } = require("../config/db");


async function findUserByEmail(email) {

    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
}


module.exports = {
    findUserByEmail
};