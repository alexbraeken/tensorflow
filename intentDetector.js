const tf = require('@tensorflow/tfjs-node');

let model;

async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('file://./model/model.json');
  }
  return model;
}

async function detectIntent(text) {
  await loadModel();

  const lower = text.toLowerCase();

  if (/properties in (.+?) under \$?(\d+)/i.test(lower)) {
    const [, location, price] = lower.match(/properties in (.+?) under \$?(\d+)/i);
    return {
      intent: 'property_search',
      location: location.trim(),
      priceRange: parseInt(price)
    };
  }

  if (/property #?(\d+)/i.test(lower)) {
    const [, id] = lower.match(/property #?(\d+)/i);
    return {
      intent: 'property_detail',
      id
    };
  }

  if (/(\d+)br in (.+)/i.test(lower)) {
    const [, bedrooms, location] = lower.match(/(\d+)br in (.+)/i);
    return {
      intent: 'property_search',
      location: location.trim(),
      bedrooms: parseInt(bedrooms)
    };
  }

  return { intent: 'unknown' };
}

module.exports = { detectIntent };
