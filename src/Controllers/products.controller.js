import ProductService from '../Services/products.service.js';
import ApiError from '../utils/ApiError.js'
import viewRouter from '../../routes/view.router.js'

class ProductController {

    getAll = async (req, res) => {
        try {
            const products = await ProductService.getAll(req.query);
            res.render(viewRouter.index, products);
        } catch (error) {
            return res.send(error)
        }
    }

    getProductById = async (req, res) => {
        try {
            const id = req.params.id
            const product = await ProductService.findById(id)

            return res.status(200).json(product)
        } catch (error) {
            return res.send(error)
        }
    }

    addProduct = async (req, res) => {
        try {
            const { title, description, price, stock, category, thumbnail } = req.body

            if (!title || !description || !price || !stock || !category) {
                throw new ApiError("Título, descrição, preço, estoque e categoria devem ser orbigatórios", 422);
            }
            const newProduct = await ProductService.create(req.body)
            return res.status(201).json(newProduct);
        } catch (error) {
            return res.send(error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            const updateProduct = await ProductService.update(req.params.id, req.body)

            if (!updateProduct) {
                throw new ApiError('Produto não encontrado.', 404);
            }

            return res.status(200).json(updateProduct); 
        } catch (error) {
            if(error instanceof ApiError) {
                return res.json({
                    message: error.message,
                    status: error.status,
                })
            }
            return res.send(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const deletedProduct = await ProductService.delete(req.params.id);

            if(deletedProduct === null) {
             throw new ApiError("Produto Não encontrado!", 404)
            }

            return res.status(200).send("Produto excluído com sucesso!")
        } catch(error) {
            return res.send(error)
        }
    }

}

export default new ProductController();