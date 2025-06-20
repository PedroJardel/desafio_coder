// const socket = io();

// socket.on('products', (dataProducts) => {
//     const tbody = document.createElement('tbody');
//     dataProducts.forEach(product => {
//         const tr = document.createElement('tr');
//         tr.classList.add('table-item');

//         tr.innerHTML = `
//         <th class="item-code" scope="row">${product._id}</th>
//         <td class="item-title">${product.title}</td>
//         <td class="item-description">${product.description}</td>
//         <td class="item-category">${product.category}</td>
//         <td class="item-stock">${product.stock}</td>
//         <td class="item-price">R$${product.price}</td>
//         <td class="item-actions">
//             <button type="button" class="btn-delete-product" data-id="${product._id}" onclick="deleteProduct(this)">
//                 <i class="fa-solid fa-trash fa-2xl"></i>
//             </button>
//         </td>
//         `;

//         tbody.appendChild(tr);
//     });

//     const table = document.getElementById('products');
//     table.querySelector('tbody')?.remove();
//     table.appendChild(tbody);
// });

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


function deleteProduct(btn) {
    event.preventDefault()
    const id = btn.dataset.id;
    socket.emit('deletedProduct', id);
}

function formatPrice(input) {
    let value = input.value;
    value = value.replace(/\D/g, ''); 

    let cents = value.slice(-2);
    let real = value.slice(0, -2);
    real = real.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    let formattedValue = real + '.' + cents;

    input.value = formattedValue;
}

function searchParams(event) {
    event?.preventDefault()
    const orderBy = document.getElementById("orderBy");
    const limit = document.getElementById("limit").value;
    let sort = ""
    let filter = ""

    if(orderBy.value) {
        const orderByArray = orderBy.value.split("_")
        sort = orderByArray[0]
        filter = orderByArray[1]
    }

    if(sort === "lowest") {
        sort = 1    
    } else if (sort === "highest") {
        sort = -1
    }
    const params = new URLSearchParams(window.location.search);
    if(sort !== "") params.set('sort', sort);
    if(filter !== "") params.set('filter', filter);
    if(limit) params.set('limit', limit)
    window.location.search = params.toString();
}