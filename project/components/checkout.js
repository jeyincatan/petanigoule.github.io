// checkout.js

// Function to calculate the total price of items in the cart
function calculateTotal(cart) {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
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
            total += product.price * product.quantity;  // Calculate total with quantity
        });

        const totalAmount = document.createElement('div');
        totalAmount.classList.add('total-amount');
        totalAmount.innerHTML = `
            <p>Total: $${total.toFixed(2)}</p>
        `;
        orderSummary.appendChild(totalAmount);
    }
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
        // Simulate a payment process
        setTimeout(() => {
            alert(`Payment successful! Total amount paid: $${total.toFixed(2)}`);
            // Send the payment status to the agent verification system
            showAgentVerificationForm();  // Show the form for agent to approve or reject
            cart.length = 0;  // Clear the cart after payment
            updateCartCount();
            displayOrderSummary(cart);  // Refresh order summary
        }, 2000); // Simulate a delay for payment
    }
}

// Function to show the agent verification form
function showAgentVerificationForm() {
    const agentVerification = document.getElementById('agent-verification');
    agentVerification.style.display = 'block';  // Show the agent verification form
}

// Function to approve the payment from the agent
function approvePayment() {
    const paymentStatus = document.getElementById('payment-status');
    paymentStatus.textContent = 'Payment Approved. The goods will be shipped.';
    alert('Payment Approved!');
}

// Function to reject the payment from the agent
function rejectPayment() {
    const paymentStatus = document.getElementById('payment-status');
    paymentStatus.textContent = 'Payment Rejected. Please check again.';
    alert('Payment Rejected.');
}

// Event listener for the checkout button
document.getElementById('checkout-button').addEventListener('click', function() {
    handlePayment(cart);
});

// Event listeners for agent's approval or rejection
document.getElementById('approve-button').addEventListener('click', approvePayment);
document.getElementById('reject-button').addEventListener('click', rejectPayment);

// Function to initialize the checkout page
function initCheckout(cart) {
    displayOrderSummary(cart);  // Show the order summary on page load
    const agentVerification = document.getElementById('agent-verification');
    agentVerification.style.display = 'none';  // Hide the agent verification form initially
}

// Initialize the checkout page with the current cart
initCheckout(cart);
