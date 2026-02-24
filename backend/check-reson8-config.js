/**
 * Quick script to check Reson8 configuration
 */

require('dotenv').config();

console.log('\n🔍 Reson8 Configuration Check\n');
console.log('='.repeat(50));

// Check Reson8 ID
const reson8Id = process.env.RESON8_ID;
if (!reson8Id || reson8Id === 'your_reson8_id_here') {
  console.log('❌ RESON8_ID: NOT SET');
  console.log('   Fix: Add RESON8_ID to backend/.env file (e.g., reson8rest-oa)');
} else {
  console.log(`✅ RESON8_ID: ${reson8Id}`);
}

// Check Reson8 Token
const reson8Token = process.env.RESON8_TOKEN;
if (!reson8Token || reson8Token === 'your_reson8_token_here') {
  console.log('❌ RESON8_TOKEN: NOT SET');
  console.log('   Fix: Add RESON8_TOKEN to backend/.env file');
} else {
  console.log(`✅ RESON8_TOKEN: Set (${reson8Token.length} characters)`);
  console.log(`   First 10 chars: ${reson8Token.substring(0, 10)}...`);
}

// Check API Key
const apiKey = process.env.RESON8_API_KEY;
if (!apiKey) {
  console.log('❌ RESON8_API_KEY: NOT SET');
  console.log('   Fix: Add RESON8_API_KEY to backend/.env file');
} else {
  console.log('✅ RESON8_API_KEY: Set');
  console.log(`   Length: ${apiKey.length} characters`);
  console.log(`   First 20 chars: ${apiKey.substring(0, 20)}...`);
  console.log(`   Last 10 chars: ...${apiKey.substring(apiKey.length - 10)}`);
  
  // Check for common issues
  if (apiKey.includes('"') || apiKey.includes("'")) {
    console.log('   ⚠️  WARNING: API key contains quotes - remove them!');
  }
  if (apiKey.startsWith(' ') || apiKey.endsWith(' ')) {
    console.log('   ⚠️  WARNING: API key has leading/trailing spaces!');
  }
}

// Check API URL
const apiUrl = process.env.RESON8_API_URL || 'https://www.reson8.ae/rest-api/v1';
console.log(`\n✅ RESON8_API_URL: ${apiUrl}`);

// Check Sender ID
const senderId = process.env.RESON8_SENDER_ID || 'SniperCarCare';
console.log(`✅ RESON8_SENDER_ID: ${senderId}`);

// Check Country Code
const countryCode = process.env.RESON8_DEFAULT_COUNTRY_CODE || '+94';
console.log(`✅ RESON8_DEFAULT_COUNTRY_CODE: ${countryCode}`);

// Check Fallback Mode
const fallbackMode = process.env.RESON8_FALLBACK_MODE;
if (fallbackMode === 'true' || fallbackMode === '1') {
  console.log('\n⚠️  RESON8_FALLBACK_MODE: ENABLED');
  console.log('   Messages will be logged instead of sent');
  console.log('   This is OK for testing, but disable for production');
} else {
  console.log('\n✅ RESON8_FALLBACK_MODE: Disabled (normal mode)');
}

console.log('\n' + '='.repeat(50));
console.log('\n💡 Next Steps:');
console.log('1. If API key is missing, add it to backend/.env');
console.log('2. If you see warnings, fix the API key format');
console.log('3. Test with: node test-reson8-message.js +94702995495');
console.log('4. If all methods fail, contact Reson8 support');
console.log('5. Enable fallback mode if needed: RESON8_FALLBACK_MODE=true\n');

