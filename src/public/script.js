const socket = io();

socket.on('products', (dataProducts) => {
    console.log(dataProducts);
    const tbody = document.createElement('tbody');
    dataProducts.forEach(product => {
        const tr = document.createElement('tr');
        tr.classList.add('table-item');

        tr.innerHTML = `
        <th class="item-code" scope="row">${product.code}</th>
        <td class="item-title">${product.title}</td>
        <td class="item-description">${product.description}</td>
        <td class="item-category">${product.category}</td>
        <td class="item-stock">${product.stock}</td>
        <td class="item-price">R$${product.price}</td>
        <td class="item-actions">
            <button type="button" class="btn-delete-product" onclick="deleteProduct(${product.id})">
                <i class="fa-solid fa-trash fa-2xl"></i>
            </button>
        </td>
        `;

        tbody.appendChild(tr);
    });

    const table = document.getElementById('products');
    table.querySelector('tbody')?.remove();
    table.appendChild(tbody);
});

document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById('title');
    const description = document.getElementById("description");
    const price = document.getElementById("price");
    const stock = document.getElementById("stock");
    const category = document.getElementById("category");

    const dataProduct = {
        title: title.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        category: category.value
    }

    socket.emit('product', dataProduct);

    document.getElementById("myForm").reset();
});


function deleteProduct(id) {
    event.preventDefault();
   socket.emit('deletedProduct', id);
}