const test = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');
const path = require('node:path');

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

// Helper to start the server
function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['server.js'], {
      env: { ...process.env, PORT: PORT, JWT_SECRET: 'test-secret' },
      stdio: 'pipe'
    });

    server.stdout.on('data', (data) => {
      if (data.toString().includes('running on')) {
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });

    server.on('error', reject);

    // Timeout if server fails to start
    setTimeout(() => reject(new Error('Server start timed out')), 5000);
  });
}

test('Secure-A-Fence API Fixes', async (t) => {
  const server = await startServer();
  let authToken = '';

  await t.test('Task 1: Privilege Escalation - User registration forces customer role', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Attacker',
        email: `attacker-${Date.now()}@test.com`,
        password: 'password123',
        role: 'admin' // Attempting to escalate
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.user.role, 'customer', 'Role should be forced to customer');
    authToken = data.token;
  });

  await t.test('Task 2: Route Optimization - Prevent crash on missing shipmentIds', async () => {
    // Need admin token for this
    // For test simplicity, use the seed admin account if possible, 
    // or we'd need to manually update DB to make the above user an admin.
    // Let's login as the default admin from seed data.
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@secureafence.com',
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    const adminToken = loginData.token;

    const res = await fetch(`${BASE_URL}/api/admin/dispatch/optimize`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({}) // Missing shipmentIds
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'shipmentIds must be a non-empty array');
  });

  await t.test('Task 3: Inventory Validation - Reject order if stock is insufficient', async () => {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        orderType: 'sale',
        items: [
          { productId: 'prod-panel-6x12', quantity: 999999 } // Way more than inStock (300)
        ],
        deliveryAddress: '123 Test St'
      })
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Insufficient stock/);
  });

  await t.test('Task 3: Product Validation - Reject order with invalid productId', async () => {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        orderType: 'sale',
        items: [
          { productId: 'non-existent-id', quantity: 1 }
        ]
      })
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Product not found/);
  });

  // Cleanup
  server.kill();
});
