// test-intent-detector.js
console.log('1 - Script started');

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-backend-cpu');

async function test() {
  console.log('4 - Loading model...');
  const model = await UniversalSentenceEncoder.load();
  console.log('5 - Model loaded');
  
  const testQuery = "Show me properties in SoHo";
  console.log('6 - Testing query:', testQuery);
  
  const result = await detectIntent(testQuery);
  console.log('7 - Result:', result);
}

console.log('8 - Starting test...');
test()
  .then(() => console.log('9 - Test completed'))
  .catch(err => console.error('X - Error:', err))
  .finally(() => process.exit(0));