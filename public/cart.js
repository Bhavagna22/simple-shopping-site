document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceSpan = document.getElementById('total-price');
    const cartCountSpan = document.getElementById('cart-count');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    async function displayCart() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            updateCartCount();
            totalPriceSpan.textContent = '0.00';
            return;
        }

        // We need all product info to display the cart correctly
        const response = await fetch('/api/products');
        const allProducts = await response.json();

        cart.forEach(cartItem => {
            const product = allProducts.find(p => p.id === cartItem.id);
            if (product) {
                const itemTotal = product.price * cartItem.quantity;
                totalPrice += itemTotal;

                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <p><strong>${product.name}</strong></p>
                    <p>Quantity: ${cartItem.quantity}</p>
                    <p>Price: ₹${itemTotal.toFixed(2)}</p>
                `;
                cartContainer.appendChild(cartItemElement);
            }
        });

        totalPriceSpan.textContent = totalPrice.toFixed(2);
        updateCartCount();
    }

    displayCart();
});