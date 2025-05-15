import { randomUUID } from 'node:crypto';

export default class Product {
    #id
    code
    constructor
        (
            title,
            description,
            price,
            status,
            stock,
            category,
            thumbnail,
        ) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
    }

    setId(id) {
        if (!this.#id) {
            this.#id = id;
        }
    }

    getId() {
        return this.#id;
    }

    setCode() {
        this.code = randomUUID();
    }

    getCode() {
        return this.code;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.title,
            description: this.description,
            code: this.code,
            price: this.price,
            status: this.status,
            stock: this.stock,
            category: this.category,
            thumbnail: this.thumbnail,
        };
    }
}