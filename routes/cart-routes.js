import express from 'express'
import { cartManager } from '../src/providers/Manager.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: "Error find all carts" });
    }

});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart(req.body || null);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(parseInt(req.params.id));
        res.status(200).json(cart)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

});

router.post('/:id/product/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(parseInt(req.params.id), parseInt(req.params.pid), req.body);
        res.status(201).json(updatedCart)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:id/product/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.removeProductToCart(parseInt(req.params.id), parseInt(req.params.pid));
        res.status(201).json(updatedCart)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const updateCarts = await cartManager.removeCart(parseInt(req.params.id));
        res.status(201).json(updateCarts)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;