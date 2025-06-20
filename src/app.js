import express from 'express'
import handlebars from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url';
import productRouter from '../routes/product-routes.js'
// import cartRouter from '../routes/cart-routes.js'
import viewRouter from '../routes/view.router.js'
import connection from './database/connection.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection.then();

app.get('/health', (req, res) => {
    return res.status(200).json({message: 'Ok'});
});

app.engine('handlebars', handlebars.engine(
    {
        defaultLayout: 'main',
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true

    }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './public/views'))
app.use(express.static(path.join(__dirname, './public')));

app.use('/api/products', productRouter);
// app.use('/api/carts', cartRouter);
app.use('/products', viewRouter);

app.use('/', (req, res) => {
    res.redirect("/products")
});


export default app;