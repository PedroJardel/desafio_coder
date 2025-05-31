import { Server } from 'socket.io';
import { productManager } from '../src/providers/Manager.js';

export const setupSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', async (socket) => {
        console.log('Novo cliente conectado:', socket.id);
        const products = await productManager.getAllProducts();
        io.emit('products', products);

        socket.on('product', async (dataProduct) => {
            await productManager.addProduct(dataProduct);
            const products = await productManager.getAllProducts();
            io.emit('products', products);
        });

        socket.on('deletedProduct', async (id) => {
            await productManager.deleteProduct(id);
            const products = await productManager.getAllProducts();
            io.emit('products', products);
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado', socket.id);
        });
    });

    return io;
};