export default class Cart {
  #id;
  constructor() {
    this.products = [];
  }

  setId(id) {
    if (!this.#id) {
      this.#id = id;
    }
  }

  getId() {
    return this.#id;
  }

  toJSON()  {
    return {
      id: this.#id,
      products: this.products,
    };
  }
}
