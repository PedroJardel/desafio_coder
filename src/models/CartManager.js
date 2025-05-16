import fs from 'fs';
import Cart from './entities/Cart.js';
import { productManager } from '../providers/Manager.js';

export default class CartManager {
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

    async getAllCarts() {
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    async getCartById(id) {
        const carts = await this.getAllCarts();
        const cart = carts.find(cart => cart.id === id);

        if (!cart) {
            throw new Error("This Cart not exists")
        }
        return cart;
    }

    async createCart(data) {
        const carts = await this.getAllCarts();
        const newCart = new Cart();
        if (data) {
            const productPromises = data.products.map(async (item) => {
                await productManager.getProductById(item.product);

                return { product: item.product, quantity: item.quantity };
            });
            newCart.products = await Promise.all(productPromises)
        }
        newCart.setId(carts[carts.length - 1].id + 1);
        carts.push(newCart);
        await fs.promises.writeFile(this.filePath, JSON.stringify(carts));
        return newCart;
    }

    async addProductToCart(cartId, productId, data) {
        const carts = await this.getAllCarts();
        const cart = await this.getCartById(cartId);
        await productManager.getProductById(productId);

        const existingProductInCart = cart.products.find((item) => item.product === productId);

        if (existingProductInCart) {
            existingProductInCart.quantity += data.quantity;
        } else {
            cart.products.push({ product: productId, quantity: data.quantity });
        }
        const index = carts.findIndex(cart => cart.id === cartId);
        carts[index] = cart
        await fs.promises.writeFile(this.filePath, JSON.stringify(carts));
        return cart;
    }

    async removeProductToCart(cartId, productId) {
        const carts = await this.getAllCarts();
        const cart = await this.getCartById(cartId);

        const updatedProducts = cart.products.filter(item => item.product !== productId)
        cart.products = updatedProducts;

        const index = carts.findIndex(cart => cart.id === cartId)
        carts[index] = cart

        await fs.promises.writeFile(this.filePath, JSON.stringify(carts));
        return cart;
    }

    async removeCart(cartId) {
        const carts = await this.getAllCarts();
        const newCartsArray = carts.filter(cart => cart.id !== cartId)

        await fs.promises.writeFile(this.filePath, JSON.stringify(newCartsArray));
        return newCartsArray;
    }
}