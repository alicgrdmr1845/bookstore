# 📚 Ali's Book Store
**CST8326 – Web Programming | Algonquin College**

## Description
A full-stack e-commerce store module built with Node.js, Express, and MongoDB Atlas. 
This store sells books and supports full CRUD operations via a REST API.

## Tech Stack
- Node.js + Express (backend)
- MongoDB Atlas + Mongoose (database)
- HTML/CSS/JavaScript (frontend)

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /products | Get all products |
| GET | /products/:id | Get one product |
| POST | /products | Create a product |
| PUT | /products/:id | Update a product |
| DELETE | /products/:id | Delete a product |
| GET | /allproducts | Get all products from all 3 stores |

## Setup
1. Clone the repo
2. Run `npm install`
3. Add your MongoDB Atlas connection string to `.env`
4. Run `npm start`
5. Open `http://localhost:3001`

## Testing
Run `npm test` to test the getAll endpoint.
Run `node automate.js` to run all team tests sequentially.

---
⚠️ *Student work for demonstration purposes only — CST8326 Web Programming, Algonquin College*
