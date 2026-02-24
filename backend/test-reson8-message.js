/**
 * Test script for Reson8 messaging system
 * 
 * Usage:
 *   node test-reson8-message.js [phone_number]
 * 
 * Example:
 *   node test-reson8-message.js +94771234567
 */

require('dotenv').config();
const { sendReson8Message } = require('./services/reson8Service');

async function testReson8Message() {
  const testPhone = process.argv[2] || process.env.TEST_PHONE || '+94771234567';
  
  console.log('\n🧪 Testing Reson8 Messaging System\n');
  console.log('=' .repeat(50));
  
  // Check configuration
  console.log('\n📋 Configuration Check:');
  console.log(`   API URL: ${process.env.RESON8_API_URL || 'https://www.reson8.ae/rest-api/v1'}`);
  console.log(`   API Key: ${process.env.RESON8_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Sender ID: ${process.env.RESON8_SENDER_ID || 'SniperCarCare'}`);
  console.log(`   Test Phone: ${testPhone}`);
  
  if (!process.env.RESON8_API_KEY) {
    console.error('\n❌ ERROR: RESON8_API_KEY is not set in .env file!');
    console.error('   Please add your Reson8 API key to backend/.env');
    process.exit(1);
  }
  
  if (!testPhone) {
    console.error('\n❌ ERROR: No phone number provided!');
    console.error('   Usage: node test-reson8-message.js +94771234567');
    process.exit(1);
  }
  
  // Test message
  const testMessage = `🧪 Test message from Sniper Car Care POS System\n\nThis is a test message to verify Reson8 integration. If you receive this, the messaging system is working correctly! 🎉\n\nTimestamp: ${new Date().toLocaleString()}`;
  
  console.log('\n📤 Sending test message...');
  console.log(`   To: ${testPhone}`);
  console.log(`   Message: ${testMessage.substring(0, 50)}...`);
  
  try {
    const result = await sendReson8Message({
      to: testPhone,
      message: testMessage,
      campaignName: 'TEST_MESSAGE',
      metadata: {
        test: true,
        timestamp: new Date().toISOString()
      }
    });
    
    console.log('\n✅ SUCCESS! Message sent successfully!');
    console.log('\n📦 Response from Reson8 API:');
    console.log(JSON.stringify(result, null, 2));
    
    console.log('\n✨ Next steps:');
    console.log('   1. Check your phone for the test message');
    console.log('   2. If you received it, the integration is working!');
    console.log('   3. If not, check:');
    console.log('      - Phone number format (should start with +94)');
    console.log('      - Reson8 API key is correct');
    console.log('      - Your Reson8 account has credits');
    console.log('      - Network connectivity');
    
  } catch (error) {
    console.error('\n❌ ERROR: Failed to send message');
    console.error(`   ${error.message}`);
    
    if (error.response) {
      console.error('\n📦 Reson8 API Error Response:');
      console.error(JSON.stringify(error.response.data, null, 2));
      console.error(`   Status: ${error.response.status}`);
    }
    
    console.error('\n🔍 Troubleshooting:');
    console.error('   1. Verify RESON8_API_KEY in backend/.env');
    console.error('   2. Check if API key is valid and active');
    console.error('   3. Verify phone number format (e.g., +94771234567)');
    console.error('   4. Check Reson8 account status and credits');
    console.error('   5. Review backend logs for detailed error messages');
    
    process.exit(1);
  }
}

// Run test
testReson8Message().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});

