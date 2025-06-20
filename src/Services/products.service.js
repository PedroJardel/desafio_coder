import productModel from '../models/entities/product.model.js';

class ProductService {

    getAll = async (query) => {
        const page = query?.page ?? 1
        const limit = query?.limit ?? 10
        const sort = query?.sort ?? 1
        const filter = query?.filter

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true
        };

        if (filter) {
            options.sort = { [filter]: parseInt(sort) };
        }

        const products = await productModel.paginate({}, options);
        console.log(products.docs)
        return products;
    }

    findById = async (id) => {
        const product = await productModel.findById(id).lean();
        return product;
    }

    create = async (product) => {
        const newProduct = await productModel.create(product);
        return newProduct;
    }

    update = async (id, product) => {
        const updatedProduct = await productModel.findByIdAndUpdate(id, { $set: product }, { new: true, runValidators: true }).lean();
        return updatedProduct;
    }

    delete = async (id) => {
        const deletedProduct = await productModel.findByIdAndDelete(id).lean();
        return deletedProduct;
    }

}

export default new ProductService();