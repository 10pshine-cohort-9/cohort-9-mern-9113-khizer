require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDatabase(app);

        await app.listen({
            port: PORT
        });

        app.log.info(`Server running on port ${PORT}`);
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

startServer();