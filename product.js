// checkout.js

// Function to calculate the total price of items in the cart
function calculateTotal(cart) {
    let total = 0;
    cart.forEach(product => {
        total += product.price * product.quantity; // Menghitung total harga berdasarkan kuantitas
    });
    return total;
}

// Function to display the order summary before checkout
function displayOrderSummary(cart) {
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = ''; // Clear the previous summary

    if (cart.length === 0) {
        orderSummary.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let total = 0;
        cart.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('cart-item');
            productItem.innerHTML = `
                <p>${product.name}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity: ${product.quantity}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            orderSummary.appendChild(productItem);
            total += product.price * product.quantity; // Menghitung total harga berdasarkan kuantitas
        });

        // Menampilkan total harga dan menambahkan opsi untuk menambah diskon atau voucher
        const totalAmount = document.createElement('div');
        totalAmount.classList.add('total-amount');
        totalAmount.innerHTML = `
            <p>Total: $${total.toFixed(2)}</p>
            <input type="text" id="discount-code" placeholder="Enter discount code" />
            <button onclick="applyDiscount()">Apply Discount</button>
            <p id="discount-message"></p>
        `;
        orderSummary.appendChild(totalAmount);
    }
}

// Function to apply discount or voucher code
function applyDiscount() {
    const discountCode = document.getElementById('discount-code').value;
    const discountMessage = document.getElementById('discount-message');
    const validDiscounts = {
        'SAVE10': 0.10, // Example discount 10%
        'FREESHIP': 0.05 // Example discount 5%
    };

    if (validDiscounts[discountCode.toUpperCase()]) {
        const discountAmount = validDiscounts[discountCode.toUpperCase()];
        const total = calculateTotal(cart);
        const discountedTotal = total - (total * discountAmount);
        discountMessage.textContent = `Discount applied: ${discountAmount * 100}%`;
        displayOrderSummaryWithTotal(cart, discountedTotal);
    } else {
        discountMessage.textContent = 'Invalid discount code!';
    }
}

// Function to update the order summary with the final total
function displayOrderSummaryWithTotal(cart, total) {
    const orderSummary = document.getElementById('order-summary');
    let totalAmount = orderSummary.querySelector('.total-amount');
    if (!totalAmount) {
        totalAmount = document.createElement('div');
        totalAmount.classList.add('total-amount');
        orderSummary.appendChild(totalAmount);
    }
    totalAmount.innerHTML = `
        <p>Total: $${total.toFixed(2)}</p>
    `;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);  // Remove the item from the cart
    displayOrderSummary(cart);  // Refresh the order summary
    updateCartCount();  // Update the cart count
}

// Function to update cart count in the UI
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;  // Update the cart count displayed on the page
}

// Function to handle payment (for simulation purposes)
function handlePayment(cart) {
    const total = calculateTotal(cart);
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add products before checking out.');
    } else {
        // Simulate a payment process with a loading indicator
        const paymentButton = document.getElementById('checkout-button');
        paymentButton.disabled = true; // Disable checkout button during payment
        const loadingMessage = document.getElementById('loading-message');
        loadingMessage.style.display = 'block'; // Show loading message

        setTimeout(() => {
            alert(`Payment successful! Total amount paid: $${total.toFixed(2)}`);
            // Clear the cart after payment
            cart.length = 0;
            updateCartCount();
            displayOrderSummary(cart);
            paymentButton.disabled = false; // Enable checkout button again
            loadingMessage.style.display = 'none'; // Hide loading message
        }, 2000); // Simulate a delay for payment
    }
}

// Function to handle the user address input
function handleAddressInput() {
    const addressInput = document.getElementById('address-input').value;
    if (addressInput.trim() === '') {
        alert('Please enter your shipping address.');
    } else {
        alert('Shipping address has been updated.');
    }
}

// Event listener for the checkout button
document.getElementById('checkout-button').addEventListener('click', function() {
    handlePayment(cart);
});

// Function to initialize the checkout page
function initCheckout(cart) {
    displayOrderSummary(cart);  // Show the order summary on page load

    // Event listener for address input
    document.getElementById('address-button').addEventListener('click', handleAddressInput);
}

// Initialize the checkout page with the current cart
initCheckout(cart);

// Adding loading message element in HTML
document.body.insertAdjacentHTML('beforeend', `
    <div id="loading-message" style="display:none;">Processing your payment...</div>
`);
