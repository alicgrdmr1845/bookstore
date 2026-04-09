// test.js - Automated test for the getAll (GET /products) endpoint
// Run with: npm test

// Import node-fetch to make HTTP requests
const fetch = require('node-fetch');

// Your student email - appears in the test output
const EMAIL = 'demi0067@algonquinlive.com';

// Test name as required by the assignment
const TEST_NAME = 'getAll to show all products';

// The URL to test - uses localhost when running locally
// Change this to your deployed Render URL after deployment
const URL = process.env.TEST_URL || 'https://ali-bookstore.onrender.com/products';

// Run the test
async function runTest() {
  try {
    // Make a GET request to the /products endpoint
    const res = await fetch(URL);

    // Get the HTTP status code from the response
    const status = res.status;

    // Determine if the test passed (status 200 means OK)
    const result = status === 200 ? 'PASSED' : 'FAILED';

    // Print the required output format
    console.log(`${EMAIL} - ${TEST_NAME} - ${status} - ${result}`);

    // Exit with code 0 if passed, 1 if failed
    process.exit(result === 'PASSED' ? 0 : 1);

  } catch (err) {
    // If the request failed entirely (server not running etc.)
    console.log(`${EMAIL} - ${TEST_NAME} - ERROR - FAILED`);
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Call the test function
runTest();
