let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get the cart from localStorage or initialize an empty array

// Function to update the cart count in the UI and store it in localStorage
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the cart to localStorage
}

// Function to show notifications on the page
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide notification after 3 seconds
}

// Function to add a product to the cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name); // Check if the product is already in the cart
    if (existingProduct) {
        existingProduct.quantity += 1; // If the product exists, increase its quantity
    } else {
        product.quantity = 1; // If the product is new, set quantity to 1
        cart.push(product); // Add the product to the cart
    }
    updateCartCount(); // Update the cart count
    showNotification(`${product.name} has been added to your cart!`); // Show a notification
}

// Add event listeners to the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.dataset.product, // Product name from data attribute
            price: parseFloat(this.dataset.price), // Product price from data attribute
            image: this.dataset.image // Product image URL from data attribute
        };
        addToCart(product); // Add the product to the cart
    });
});

// Function to filter products by category
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.classList.contains(category)) {
            product.style.display = 'block'; // Show products that match the category
        } else {
            product.style.display = 'none'; // Hide products that don't match the category
        }
    });
}

// Function to view the cart contents
function viewCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear the cart display
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('cart-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <p>${product.name}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity: ${product.quantity}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
            `;
            cartList.appendChild(productItem);
        });
    }
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the product by index
    updateCartCount(); // Update the cart count
    viewCart(); // Refresh the cart view
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(index) {
    cart[index].quantity += 1; // Increase the quantity of the product
    updateCartCount(); // Update the cart count
    viewCart(); // Refresh the cart view
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Decrease the quantity of the product
        updateCartCount(); // Update the cart count
        viewCart(); // Refresh the cart view
    }
}

// Function to proceed to checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add products first.');
    } else {
        let total = 0;
        cart.forEach(product => {
            total += product.price * product.quantity; // Calculate the total cost
        });
        const formattedTotal = total.toFixed(2);
        alert(`Total Payment: $${formattedTotal}`);
        // Redirect to payment page (this is just a simulation)
        window.location.href = `/payment?total=${formattedTotal}`;
    }
}

// Event listener for the checkout button
document.getElementById('checkout-button').addEventListener('click', checkout);

// Initialize the cart view and count when the page loads
window.addEventListener('load', function() {
    updateCartCount(); // Update the cart count
    viewCart(); // Display the cart contents
});

// Function to clear the entire cart
function clearCart() {
    cart = []; // Clear the cart
    updateCartCount(); // Update the cart count
    viewCart(); // Refresh the cart view
}

// Event listener for the "Clear Cart" button
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Function to search products based on the name
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(query.toLowerCase())) {
            product.style.display = 'block'; // Show products that match the search query
        } else {
            product.style.display = 'none'; // Hide products that don't match the search query
        }
    });
}

// Event listener for the product search input
document.getElementById('search-input').addEventListener('input', function(e) {
    searchProducts(e.target.value); // Filter products based on the search query
});
