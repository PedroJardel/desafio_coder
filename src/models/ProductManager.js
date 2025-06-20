import fs from 'fs';
import Product from './entities/product.model.js';

export default class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.ensureFileExists();
    }

    async ensureFileExists() {
        try {
            await fs.promises.access(this.filePath);
        } catch {
            await fs.promises.writeFile(this.filePath, '[]');
        }
    }

    async getAllProducts() {
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        return JSON.parse(data)
    }

    async getProductById(id) {
        const products = await this.getAllProducts();
        const product = products.find(product => product.id === id);

        if (!product) {
            throw new Error(`This product not Exists: ${id}`)
        };

        return product
    }

    async addProduct(productData) {
        const products = await this.getAllProducts();
        const newProduct = new Product(
            productData.title,
            productData.description,
            productData.price,
            productData.status ? productData.status : true,
            productData.stock,
            productData.category,
            productData.thumbnail ? productData.thumbnail : null,
        );
        newProduct.setId(products.length + 1);
        newProduct.setCode();
        products.push(newProduct);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getAllProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            await fs.promises.writeFile(this.filePath, JSON.stringify(products));
            return products[index];
        }
        return null;
    }

    async deleteProduct(id) {
        const products = await this.getAllProducts();
        const filteredProducts = products.filter(product => product.id !== id);
        await fs.promises.writeFile(this.filePath, JSON.stringify(filteredProducts));
        return filteredProducts;
    }
}