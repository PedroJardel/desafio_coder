import path from 'path';
import { fileURLToPath } from 'url';
import CartManager from "../models/CartManager.js";
import ProductManager from '../models/ProductManager.js';

const __filenameCarts = fileURLToPath(import.meta.url);
const __dirnameCarts = path.dirname(__filenameCarts);
const cartsFilePath = path.join(__dirnameCarts, '../../carts.json');
const cartManager = new CartManager(cartsFilePath);

const __filenameProducts = fileURLToPath(import.meta.url)
const __dirnameProducts = path.dirname(__filenameProducts)
const productsFilePath = path.join(__dirnameProducts, '../../products.json');
const productManager = new ProductManager(productsFilePath);

export {productManager, cartManager};