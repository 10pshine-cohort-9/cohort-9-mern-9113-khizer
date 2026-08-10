const { pool } = require("../config/db");
const logger = require("../utils/logger");

async function findUserByEmail(email){
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0];
    } catch(error){
        logger.error(error, "Error finding user");
        throw error;
    }
}

async function createUser(name, email, password) {
    try {
        const [result] = await pool.execute(
            `INSERT INTO users (name, email, password)
             VALUES (?, ?, ?)`,
            [name, email, password]
        );
        return result.insertId;
    }
    catch (error) {
        logger.error(error, "Error creating user");
        throw error;
    }
}

module.exports = {
    findUserByEmail,
    createUser
};