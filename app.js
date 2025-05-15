import express from 'express'
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

export default app;