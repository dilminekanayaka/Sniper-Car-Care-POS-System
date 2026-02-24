const express = require('express');
const router = express.Router();

// Mock Hikvision API endpoint
router.post('/hikvision/detect', (req, res) => {
  // Simulate ANPR detection
  const mockPlateNumber = generateMockPlateNumber();
  
  res.json({
    success: true,
    plate_number: mockPlateNumber,
    confidence: 0.92,
    timestamp: new Date().toISOString()
  });
});

// Mock Twilio SMS endpoint
router.post('/twilio/sms', (req, res) => {
  const { to, message } = req.body;
  
  console.log('📱 Mock SMS sent:', { to, message });
  
  res.json({
    success: true,
    message: 'SMS sent successfully',
    sid: 'SM' + Math.random().toString(36).substr(2, 9)
  });
});

// Helper function
function generateMockPlateNumber() {
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const digits = '0123456789';
  const letter1 = letters[Math.floor(Math.random() * letters.length)];
  const letter2 = letters[Math.floor(Math.random() * letters.length)];
  const num1 = digits[Math.floor(Math.random() * digits.length)];
  const num2 = digits[Math.floor(Math.random() * digits.length)];
  const num3 = digits[Math.floor(Math.random() * digits.length)];
  const num4 = digits[Math.floor(Math.random() * digits.length)];
  return `${letter1}${letter2}${num1}${num2}${num3}${num4}`;
}

module.exports = router;

