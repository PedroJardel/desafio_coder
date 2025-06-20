import { Server } from 'socket.io';
import ProductService from '../src/Services/products.service.js';

export const setupSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', async (socket) => {
        console.log('Novo cliente conectado:', socket.id);
        // const products = await ProductService.getAll();
        // io.emit('products', products);

        socket.on('product', async (dataProduct) => {
            dataProduct.price = parseFloat(dataProduct.price);
            dataProduct.stock = parseInt(dataProduct.stock);
            await ProductService.create(dataProduct);
            // const products = await ProductService.getAll();
            // io.emit('products', products);
        });

        socket.on('deletedProduct', async (id) => {
            await ProductService.delete(id);
            // const products = await ProductService.getAll();
            // io.emit('products', products);
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado', socket.id);
        });
    });

    return io;
};