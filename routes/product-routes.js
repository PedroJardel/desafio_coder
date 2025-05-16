import express from 'express'
import { productManager } from '../src/providers/Manager.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving products' });
    }
});

router.get('/:id', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
});

router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(parseInt(req.params.id), req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).json({ error: 'Product not found' });
});

router.delete('/:id', async (req, res) => {
    const remainingProducts = await productManager.deleteProduct(parseInt(req.params.id));
    res.json(remainingProducts);
});

export default router;