import express from 'express'
import ProductService from '../src/Services/products.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await ProductService.getAll(req.query)
        return res.render("index", {
            products: result.docs,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            nextPage: result.nextPage || result.page + 1,
            prevPage: result.prevPage || (result.page > 1 ? result.page - 1 : 1),
            currentPage: result.page,
            totalPages: result.totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving products' });
    }
});

export default router;