import express from 'express'
import dotenv from "dotenv";
import productRouter from './routes/product-routes.js'
import cartRouter from './routes/cart-routes.js'

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 8080;

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

export default app;