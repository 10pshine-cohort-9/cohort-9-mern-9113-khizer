const {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

const authMiddleware = require("../middleware/authMiddleware");

async function noteRoutes(fastify) {

    fastify.get(
        "/",
        {
            preHandler: authMiddleware
        },
        getNotes
    );

    fastify.post(
        "/",
        {
            preHandler: authMiddleware,
            schema: {
                body: {
                    type: "object",
                    required: ["title", "content"],
                    properties: {
                        title: {
                            type: "string",
                            minLength: 1,
                            maxLength: 255
                        },
                        content: {
                            type: "string",
                            minLength: 1
                        }
                    }
                }
            }
        },
        createNote
    );

    fastify.put(
        "/:id",
        {
            preHandler: authMiddleware,
            schema: {
                params: {
                    type: "object",
                    required: ["id"],
                    properties: {
                        id: {
                            type: "string"
                        }
                    }
                },
                body: {
                    type: "object",
                    required: ["title", "content"],
                    properties: {
                        title: {
                            type: "string",
                            minLength: 1,
                            maxLength: 255
                        },
                        content: {
                            type: "string",
                            minLength: 1
                        }
                    }
                }
            }
        },
        updateNote
    );

    fastify.delete(
        "/:id",
        {
            preHandler: authMiddleware,
            schema: {
                params: {
                    type: "object",
                    required: ["id"],
                    properties: {
                        id: {
                            type: "string"
                        }
                    }
                }
            }
        },
        deleteNote
    );
}

module.exports = noteRoutes;