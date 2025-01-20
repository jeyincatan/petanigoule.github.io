let cart = JSON.parse(localStorage.getItem('cart')) || []; // Mengambil keranjang dari localStorage atau membuat array baru

// Fungsi untuk memperbarui jumlah produk di keranjang
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; // Update jumlah item di keranjang
    localStorage.setItem('cart', JSON.stringify(cart)); // Menyimpan keranjang ke localStorage
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.opacity = '1'; // Menampilkan notifikasi
    setTimeout(() => {
        notification.style.opacity = '0'; // Menyembunyikan notifikasi setelah 3 detik
    }, 3000); 
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name); // Mengecek apakah produk sudah ada di keranjang
    if (existingProduct) {
        existingProduct.quantity += 1; // Jika produk sudah ada, tambahkan kuantitas
    } else {
        product.quantity = 1; // Jika produk baru, set kuantitas ke 1
        cart.push(product); // Menambahkan produk baru ke keranjang
    }
    updateCartCount(); // Memperbarui jumlah produk di keranjang
    showNotification(`${product.name} berhasil ditambahkan ke keranjang!`); // Menampilkan notifikasi
}

// Menangani event klik pada tombol "Tambah ke Keranjang"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.dataset.product, // Nama produk
            price: parseFloat(this.dataset.price), // Harga produk
            image: this.dataset.image // Gambar produk
        };
        addToCart(product); // Menambahkan produk ke keranjang
        animateAddToCart(button); // Animasi tombol tambah ke keranjang
    });
});

// Fungsi untuk memfilter produk berdasarkan kategori
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.classList.contains(category)) {
            product.style.display = 'block'; // Menampilkan produk yang sesuai kategori
        } else {
            product.style.display = 'none'; // Menyembunyikan produk yang tidak sesuai kategori
        }
    });
}

// Fungsi untuk menampilkan halaman keranjang
function viewCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Menghapus daftar keranjang
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Keranjang Anda kosong.</p>'; // Menampilkan pesan jika keranjang kosong
    } else {
        cart.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('cart-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <p>${product.name}</p>
                <p>Harga: $${product.price.toFixed(2)}</p>
                <p>Jumlah: ${product.quantity}</p>
                <button onclick="removeFromCart(${index})">Hapus</button>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
            `;
            cartList.appendChild(productItem);
        });
    }
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1); // Menghapus produk berdasarkan index
    updateCartCount(); // Memperbarui jumlah produk di keranjang
    viewCart(); // Memperbarui tampilan keranjang
}

// Fungsi untuk menambah kuantitas produk di keranjang
function increaseQuantity(index) {
    cart[index].quantity += 1; // Menambah kuantitas produk
    updateCartCount(); // Memperbarui jumlah produk di keranjang
    viewCart(); // Memperbarui tampilan keranjang
}

// Fungsi untuk mengurangi kuantitas produk di keranjang
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Mengurangi kuantitas produk
        updateCartCount(); // Memperbarui jumlah produk di keranjang
        viewCart(); // Memperbarui tampilan keranjang
    }
}

// Fungsi untuk menghitung total harga produk di keranjang
function calculateTotal() {
    let total = 0;
    cart.forEach(product => {
        total += product.price * product.quantity; // Menghitung total harga
    });
    return total.toFixed(2); // Mengembalikan total dalam format dua angka desimal
}

// Fungsi untuk menampilkan halaman checkout atau pembayaran
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong! Silakan tambah produk terlebih dahulu.');
    } else {
        const total = calculateTotal(); // Menghitung total pembayaran
        alert(`Total Pembayaran: $${total}`); // Menampilkan total harga
        // Simulasi halaman pembayaran atau pengalihan
        window.location.href = `/payment?total=${total}`; // Arahkan ke halaman pembayaran
    }
}

// Event listener untuk tombol Checkout
document.getElementById('checkout-button').addEventListener('click', checkout);

// Menginisialisasi tampilan keranjang saat halaman dimuat
window.addEventListener('load', function() {
    updateCartCount();
    viewCart();
});

// Fungsi untuk menghapus semua produk dari keranjang
function clearCart() {
    cart = []; // Menghapus semua produk dari keranjang
    updateCartCount(); // Memperbarui jumlah produk di keranjang
    viewCart(); // Memperbarui tampilan keranjang
}

// Menangani event untuk menghapus semua produk dari keranjang
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Fungsi untuk mencari produk berdasarkan kata kunci
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(query.toLowerCase())) {
            product.style.display = 'block'; // Menampilkan produk yang cocok
        } else {
            product.style.display = 'none'; // Menyembunyikan produk yang tidak cocok
        }
    });
}

// Event listener untuk input pencarian
document.getElementById('search-input').addEventListener('input', function(e) {
    searchProducts(e.target.value); // Menyaring produk berdasarkan input pencarian
});

// Fungsi untuk menambahkan produk dari halaman rekomendasi ke keranjang
function addRecommendedProductToCart(product) {
    const recommendedProduct = {
        name: product.name,
        price: product.price,
        image: product.image
    };
    addToCart(recommendedProduct); // Menambahkan produk rekomendasi ke keranjang
}

// Menangani event klik pada tombol "Tambah ke Keranjang" pada produk rekomendasi
document.querySelectorAll('.recommended-product .add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.dataset.product,
            price: parseFloat(this.dataset.price),
            image: this.dataset.image
        };
        addRecommendedProductToCart(product); // Menambahkan produk rekomendasi ke keranjang
    });
});

// Menambahkan animasi atau efek dinamis
function animateAddToCart(button) {
    button.classList.add('animate'); // Menambahkan kelas untuk animasi
    setTimeout(() => {
        button.classList.remove('animate'); // Menghapus kelas animasi setelah selesai
    }, 300); // Durasi animasi
}

// Menambahkan event listener animasi pada tombol tambah ke keranjang
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        animateAddToCart(button);
    });
});
