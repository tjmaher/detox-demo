import { device } from 'detox';

beforeAll(async () => {
  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'YES' }
  });
});

// Ensure Allure results directory exists
const fs = require('fs');
const path = require('path');
const allureResultsDir = path.join(__dirname, '..', 'allure-results');
if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir, { recursive: true });
}