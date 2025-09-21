document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const cartCountSpan = document.getElementById('cart-count');

    // Initialize cart from localStorage or create an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Fetch products and display them
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            productContainer.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                `;
                productContainer.appendChild(productCard);
            });
        });

    // Event listener for adding items to cart
    productContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.dataset.productId);
            
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('Item added to cart!');
        }
    });

    updateCartCount();
});