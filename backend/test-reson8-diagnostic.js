/**
 * Diagnostic script to test Reson8 API authentication
 * This will help identify the correct authentication format
 */

require('dotenv').config();
const axios = require('axios');

async function runDiagnostics() {
  const apiKey = process.env.RESON8_API_KEY;
  const baseUrl = process.env.RESON8_API_URL || 'https://www.reson8.ae/rest-api/v1';

  if (!apiKey) {
    console.error('❌ RESON8_API_KEY not found in .env file');
    process.exit(1);
  }

  console.log('\n🔍 Reson8 API Diagnostic Test\n');
  console.log('='.repeat(60));
  console.log(`API URL: ${baseUrl}`);
  console.log(`API Key: ${apiKey.substring(0, 20)}...${apiKey.substring(apiKey.length - 10)}`);
  console.log(`API Key Length: ${apiKey.length} characters`);
  console.log('='.repeat(60));

  const testPhone = '+94702995495';
  const testMessage = 'Test message';

  // Test 1: Check if endpoint exists (without auth)
  console.log('\n📡 Test 1: Checking endpoint availability...');
  try {
    await axios.get(`${baseUrl}/message`, { timeout: 5000 });
    console.log('✅ Endpoint is accessible (no auth)');
  } catch (err) {
    console.log(`⚠️  Endpoint check: ${err.response?.status || err.message}`);
  }

  console.log('\n📡 Test 2: Testing username:password combinations...');
  const usernameFormats = ['api', 'user', 'admin', apiKey.substring(0, 10)];

  for (const username of usernameFormats) {
    const basicAuth = Buffer.from(`${username}:${apiKey}`).toString('base64');
    try {
      const res = await axios.post(
        `${baseUrl}/message`,
        {
          to: testPhone,
          message: testMessage,
          sender: 'Test'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basicAuth}`
          },
          timeout: 5000
        }
      );
      console.log(`✅ SUCCESS with username: "${username}"`);
      console.log('Response:', res.data);
      process.exit(0);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.log(`⚠️  ${username}: Got ${err.response?.status} (not 401)`);
      }
    }
  }

  console.log('\n❌ All tests completed. None of the standard methods worked.');
  console.log('\n💡 Recommendations:');
  console.log('1. Check Reson8 API documentation at: https://www.reson8.ae');
  console.log('2. Verify the API key is active in your Reson8 account');
  console.log('3. Contact Reson8 support to confirm authentication method');
  console.log('4. Check if your Reson8 account needs activation');
}

runDiagnostics().catch(error => {
  console.error('\n💥 Unexpected error:', error.message);
  process.exit(1);
});
