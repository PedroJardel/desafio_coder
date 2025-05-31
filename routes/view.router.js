import express from 'express'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render("index", {});
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving products' });
    }
});

export default router;