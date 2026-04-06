// Import mongoose to define the database schema
const mongoose = require('mongoose');

// Define the schema (structure) for a product in the bookstore
const productSchema = new mongoose.Schema({
  // storeId - unique identifier for this store
  storeId: {
    type: String,
    required: true,
    default: 'S2' // Ali's Book Store is Store 2
  },

  // storeName - name of the store
  storeName: {
    type: String,
    required: true,
    default: 'Book Store'
  },

  // productId - unique identifier for each product
  productId: {
    type: String,
    required: true,
    unique: true
  },

  // productName - name of the book/product
  productName: {
    type: String,
    required: true
  },

  // price - price of the product as a number
  price: {
    type: Number,
    required: true
  }
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Product', productSchema);
