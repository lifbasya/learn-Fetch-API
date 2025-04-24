// async maksudnya adalah menjalankan fungsi secara asynchronous
// karena defaultnya, javascript menjalankan fungsi secara synchrounous atau blocking, artinya, ketika banyak fungsi dijalankan, fungsi tersebut harus 'mengantri'. Jika salah satu fungsi tidak berjalan atau berjalan lambat, maka fungsi fungsi setelahnya, tidak akan jalan.

async function fetchData() {
    try {
        const res = await fetch('https://fakestoreapi.com/products/');
        const data = await res.json();

        renderProducts(data);
        console.log(data);
    } catch (error) {
        console.log('GAGAL EUI!!!', error);
    }
}

const productContainer = document.querySelector('.products-list');

function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add("card");

        const hargaRupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price * 17000);

        div.innerHTML = `
            <img src=${product.image}>
            <h3>${product.title}</h3>
            <p>${hargaRupiah}</p>
            <p>${product.description}</p>
        `;

        productContainer.appendChild(div);
    });
}

fetchData();

const buttons = document.querySelectorAll(".btn-label");

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const categoryValue = btn.getAttribute('data-category');
        console.log(categoryValue);

        // Remove 'active' class dari semua button
        buttons.forEach(button => button.classList.remove('active'));

        // Tambahkan 'active' ke button yang diklik
        btn.classList.add('active');

        // Panggil fungsi berdasarkan kategori
        if (categoryValue === "all") {
            fetchData();
        } else {
            getByCategory(categoryValue);
        }
    });
});

async function getByCategory(category) {
    try {
        const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
        const response = await fetch(url);
        const data = await response.json();
        renderProducts(data);
    } catch (error) {
        console.error(`gagal loading kategori ${category}`, error);
    }
}