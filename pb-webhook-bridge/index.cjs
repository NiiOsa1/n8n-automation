global.EventSource = require('eventsource');

const PocketBase = require('pocketbase/cjs');
const axios = require('axios');
require('dotenv').config();

const pb = new PocketBase(process.env.POCKETBASE_URL);
const webhookUrl = `${process.env.WEBHOOK_URL}/webhook/${process.env.LEAVE_REQUEST_WEBHOOK_PATH}`;

const maxRetries = 3;
const retryDelayMs = 1500;

async function authenticate() {
  try {
    const authData = await pb.collection('users').authWithPassword(
      process.env.PB_USER_EMAIL,
      process.env.PB_USER_PASSWORD
    );
    console.log(`✅ Authenticated as ${authData.record.email}`);
  } catch (err) {
    console.error('❌ PocketBase auth failed:', err.message);
    process.exit(1);
  }
}

async function sendWebhook(recordId) {
  const authHeader = 'Basic ' +
    Buffer.from(`${process.env.N8N_BASIC_AUTH_USER}:${process.env.N8N_BASIC_AUTH_PASSWORD}`).toString('base64');

  const payload = { recordId };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log('📦 Sending webhook with recordId:', recordId);
      const res = await axios.post(webhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        }
      });
      console.log(`🚀 Webhook sent (Attempt ${attempt}): ${res.status}`);
      return;
    } catch (err) {
      const status = err.response?.status || err.message;
      console.error(`❌ Webhook failed (Attempt ${attempt}):`, status);
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, retryDelayMs));
      }
    }
  }
  console.error('🚨 Max retries reached. Webhook not delivered.');
}

function startListener() {
  pb.collection('LeaveRequests').subscribe('*', async ({ action, record }) => {
    if (action !== 'create') return;
    console.log('🛰️ New LeaveRequest created:', record.id);
    await sendWebhook(record.id);
  }).then(() => {
    console.log('🔁 Listening for LeaveRequests...');
  }).catch(err => {
    console.error('❌ Subscription error:', err.message);
  });
}

(async () => {
  await authenticate();

  if (process.env.ENABLE_WEBHOOK_HEALTHCHECK === 'true') {
    try {
      const res = await axios.get(webhookUrl);
      console.log('✅ Webhook endpoint reachable:', res.status);
    } catch (err) {
      console.warn('⚠️ Webhook healthcheck failed:', err.message);
    }
  }

  startListener();
})();
