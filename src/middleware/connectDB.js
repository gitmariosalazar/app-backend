import {client} from "../database/connection.js";

async function connectDB (req, res, next) {
    try {
        await client.connect();
        next();
    } catch (error) {
        // console.error('Error al conectar a PostgreSQL:', error);
        res.status(500).json({
            error: error.message,
            message: "Error connect!",
            results: null
        })
    }
}

export {connectDB}
