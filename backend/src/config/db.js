const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

async function connectDatabase(app) {
    try {
        const connection = await pool.getConnection();

        app.log.info("Database connected successfully");

        connection.release();
    }
    catch (error) {
        app.log.error(error, "Database connection failed");
        process.exit(1);
    }
}

module.exports = {
    pool,
    connectDatabase
};