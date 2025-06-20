import express from 'express';
import ProductController from '../src/Controllers/products.controller.js';
import GetByIdRequest from '../src/Requests/Products/GetByIdRequest.js'

const router = express.Router();

router.get('/', ProductController.getAll);

router.get('/:id', GetByIdRequest.validate(), ProductController.getProductById);

router.post('/', ProductController.addProduct);

router.put('/:id',GetByIdRequest.validate(), ProductController.updateProduct);

router.delete('/:id', GetByIdRequest.validate(), ProductController.deleteProduct);

export default router;