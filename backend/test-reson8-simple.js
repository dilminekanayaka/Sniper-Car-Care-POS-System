/**
 * Simple test to verify Reson8 authentication
 * Tests with minimal payload
 */

require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.RESON8_API_KEY;
const reson8Id = process.env.RESON8_ID;
const reson8Token = process.env.RESON8_TOKEN;
const baseUrl = process.env.RESON8_API_URL || 'https://www.reson8.ae/rest-api/v1';

console.log('\n🧪 Simple Reson8 Authentication Test\n');
console.log('='.repeat(50));

if (!apiKey || !reson8Id || !reson8Token) {
  console.error('❌ Missing credentials in .env file');
  process.exit(1);
}

console.log('✅ All credentials found');
console.log(`   X-Reson8-ID: ${reson8Id}`);
console.log(`   X-Reson8-Token: ${reson8Token.substring(0, 10)}...`);
console.log(`   API Key: ${apiKey.substring(0, 10)}...`);

// Minimal payload for testing
const payload = {
  to: '94702995495', // Your phone without +
  text: 'Test message',
  from: 'SniperCarCare', // Your registered sender ID
  name: 'Test_Campaign',
  type: 'Operational'
};

const headers = {
  'Content-Type': 'application/json',
  'X-Reson8-ID': reson8Id,
  'X-Reson8-Token': reson8Token,
  'api-key': apiKey
};

console.log('\n📤 Sending test request...');
console.log('URL:', `${baseUrl}/message/campaign`);
console.log('Payload:', JSON.stringify(payload, null, 2));
console.log('Headers:', {
  'X-Reson8-ID': reson8Id,
  'X-Reson8-Token': reson8Token.substring(0, 10) + '...',
  'api-key': apiKey.substring(0, 10) + '...',
  'Content-Type': 'application/json'
});

axios.post(`${baseUrl}/message/campaign`, payload, { headers, timeout: 10000 })
  .then(response => {
    console.log('\n✅ SUCCESS!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.errorLevel === 0) {
      console.log('\n🎉 Message sent successfully!');
      console.log('Request ID:', response.data.requestID);
      console.log('Campaign ID:', response.data.campaignID);
    } else {
      console.log('\n⚠️ API returned error level:', response.data.errorLevel);
      console.log('Message:', response.data.procResponse);
    }
  })
  .catch(error => {
    console.error('\n❌ ERROR:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        console.error('\n💡 401 Unauthorized - Possible issues:');
        console.error('1. X-Reson8-ID or X-Reson8-Token might be incorrect');
        console.error('2. API key might not match dashboard');
        console.error('3. Account might not have API access enabled');
        console.error('4. Trial account might have limited API access');
      }
      
      if (error.response.data?.procResponse?.includes('Unregistered from-address')) {
        console.error('\n💡 Sender ID Issue:');
        console.error('The "from" address (SniperCarCare) needs to be registered in Reson8 dashboard');
        console.error('Check your dashboard for registered sender IDs/headers');
      }
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  });

