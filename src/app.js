import express from 'express'
import handlebars from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import productRouter from '../routes/product-routes.js'
import cartRouter from '../routes/cart-routes.js'
import viewRouter from '../routes/view.router.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewRouter);

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './public/views'))
app.use(express.static(path.join(__dirname, './public')));

export default app;