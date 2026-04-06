// automate.js - Runs all 3 team members' tests sequentially
// Run with: node automate.js

// Import child_process to run shell commands
const { exec } = require('child_process');

// ─────────────────────────────────────────────
// TEAM TEST CONFIGURATIONS
// Replace the TEST_URL values with each teammate's deployed URL
// once they share their links in the group chat
// ─────────────────────────────────────────────
const tests = [
  {
    name: "Ali's Book Store",
    command: 'node test.js',
    env: { ...process.env, TEST_URL: 'https://ali-bookstore.onrender.com/products' }
  },
  {
    name: "Farha's Electronics Store",
    // Once Farha shares her test file path and deployed URL, update below
    command: 'node farha-test.js',
    env: { ...process.env, TEST_URL: 'https://farha-electronics.onrender.com/products' }
  },
  {
    name: "Kemal's Car Store",
    // Once Kemal shares his test file path and deployed URL, update below
    command: 'node kemal-test.js',
    env: { ...process.env, TEST_URL: 'https://kemal-carstore.onrender.com/products' }
  }
];

// ─────────────────────────────────────────────
// RUN TESTS SEQUENTIALLY
// ─────────────────────────────────────────────

console.log('========================================');
console.log('   CST8326 - Group 7 Automated Tests    ');
console.log('========================================\n');

// Run each test one at a time using a recursive function
function runNext(index) {
  // If all tests are done, print summary
  if (index >= tests.length) {
    console.log('\n========================================');
    console.log('         All tests completed!           ');
    console.log('========================================');
    return;
  }

  const test = tests[index];

  console.log(`Running: ${test.name}`);
  console.log('----------------------------------------');

  // Execute the test command
  exec(test.command, { env: test.env }, (error, stdout, stderr) => {
    // Print the test output
    if (stdout) console.log(stdout.trim());
    if (stderr) console.error(stderr.trim());

    console.log('');

    // Run the next test after this one finishes
    runNext(index + 1);
  });
}

// Start running tests from index 0
runNext(0);
