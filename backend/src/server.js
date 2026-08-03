require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await app.listen({
            port: PORT,
            host: "0.0.0.0"
        });

        console.log(`Server running on port ${PORT}`);

    } catch (error) {

        app.log.error(error);
        process.exit(1);
    }
};
start();