// Import the express library
const express = require('express');

// Create an instance of an express application
const app = express();

// Define the port the server will run on
const PORT = 3000;

// --- Middleware ---
// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// --- Mock Product Data ---
// In a real application, this would come from a database
const products = [
    { id: 1, name: 'Classic T-Shirt', price: 499, image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Denim Jeans', price: 1299, image: 'https://via.placeholder.com/250' },
    { id: 3, name: 'Running Sneakers', price: 2499, image: 'https://via.placeholder.com/250' },
    { id: 4, name: 'Leather Jacket', price: 7999, image: 'https://via.placeholder.com/250' }
];

// --- API Route ---
// Create a GET route to send product data to the client
app.get('/api/products', (req, res) => {
    res.json(products);
});

// --- Start the Server ---
// Listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`🛒 Server is running and listening on http://localhost:${PORT}`);
});