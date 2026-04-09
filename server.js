// Load environment variables from .env file (MONGO_URI and PORT)
require('dotenv').config();

// Import express to create the web server
const express = require('express');

// Import mongoose to connect to MongoDB Atlas
const mongoose = require('mongoose');

// Import the Product model we defined in model.js
const Product = require('./model');

// Import path to serve static HTML files
const path = require('path');

// Create the express application
const app = express();

// Middleware: allow express to read JSON from request body
app.use(express.json());

// Middleware: allow express to read form data from request body
app.use(express.urlencoded({ extended: true }));

// Middleware: serve static files (HTML, CSS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────────────────────
// CONNECT TO MONGODB ATLAS
// ─────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Successfully connected to MongoDB Atlas
    console.log('✅ Connected to MongoDB Atlas');

    // Seed the database with 5 books if the collection is empty
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany([
        { storeId: 'S2', storeName: 'Book Store', productId: 'P1', productName: 'The Great Gatsby', price: 12.99 },
        { storeId: 'S2', storeName: 'Book Store', productId: 'P2', productName: 'To Kill a Mockingbird', price: 14.99 },
        { storeId: 'S2', storeName: 'Book Store', productId: 'P3', productName: '1984 by George Orwell', price: 11.99 },
        { storeId: 'S2', storeName: 'Book Store', productId: 'P4', productName: 'The Alchemist', price: 13.99 },
        { storeId: 'S2', storeName: 'Book Store', productId: 'P5', productName: 'Atomic Habits', price: 16.99 }
      ]);
      console.log('📚 5 books seeded into MongoDB Atlas');
    }
  })
  .catch(err => {
    // Failed to connect - print the error
    console.error('❌ MongoDB connection error:', err.message);
  });

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

// GET /products → return ALL products from this store
app.get('/products', async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find();
    // Send products as JSON response
    res.json(products);
  } catch (err) {
    // If something goes wrong, send a 500 error
    res.status(500).json({ error: err.message });
  }
});

// GET /products/:id → return ONE product by its productId
app.get('/products/:id', async (req, res) => {
  try {
    // Find the product where productId matches the URL parameter
    const product = await Product.findOne({ productId: req.params.id });

    // If no product found, return 404
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Send the product as JSON
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /products → create a NEW product
app.post('/products', async (req, res) => {
  try {
    // Create a new product using the data from the request body
    const product = new Product({
      storeId: 'S2',
      storeName: 'Book Store',
      productId: req.body.productId,
      productName: req.body.productName,
      price: req.body.price
    });

    // Save the product to MongoDB Atlas
    const saved = await product.save();

    // Send the saved product back with status 201 (Created)
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /products/:id → UPDATE an existing product by productId
app.put('/products/:id', async (req, res) => {
  try {
    // Find the product by productId and update it with the request body data
    const updated = await Product.findOneAndUpdate(
      { productId: req.params.id },  // find by productId
      {
        productName: req.body.productName,
        price: req.body.price
      },
      { new: true } // return the updated document, not the old one
    );

    // If no product found, return 404
    if (!updated) return res.status(404).json({ error: 'Product not found' });

    // Send the updated product as JSON
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /products/:id → DELETE a product by productId
app.delete('/products/:id', async (req, res) => {
  try {
    // Find the product by productId and remove it
    const deleted = await Product.findOneAndDelete({ productId: req.params.id });

    // If no product found, return 404
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    // Confirm deletion
    res.json({ message: 'Product deleted successfully', product: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /allproducts → fetch products from ALL 3 stores combined (Integration)
app.get('/allproducts', async (req, res) => {
  try {
    // Get products from THIS store (Ali's Book Store)
    const myProducts = await Product.find();

    // Fetch products from Farha's Electronics Store (replace URL after she deploys)
    let farhaProducts = [];
    try {
      const farhaRes = await fetch('https://farha-store.onrender.com/products');
      farhaProducts = await farhaRes.json();
    } catch (e) {
      // If Farha's store is not yet deployed, skip it
      console.log('⚠️  Could not reach Farha store:', e.message);
    }

    // Fetch products from Kemal's Car Store (replace URL after he deploys)
    let kemalProducts = [];
    try {
      const kemalRes = await fetch('https://clothing-store-saix.onrender.com/products');
      kemalProducts = await kemalRes.json();
    } catch (e) {
      // If Kemal's store is not yet deployed, skip it
      console.log('⚠️  Could not reach Kemal store:', e.message);
    }

    // Combine all products from all 3 stores into one array
    const allProducts = [...myProducts, ...farhaProducts, ...kemalProducts];

    // Send the combined array as JSON
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// START THE SERVER
// ─────────────────────────────────────────────

// Get the port from .env file or default to 3001
const PORT = process.env.PORT || 3001;

// Start listening for requests
app.listen(PORT, () => {
  console.log(`🚀 Ali's Book Store running at http://localhost:${PORT}`);
});
