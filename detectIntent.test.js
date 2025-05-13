const { detectIntent } = require('./intentDetector');
const tf = require('@tensorflow/tfjs-node');
const path = require('path');

describe('detectIntent()', () => {
    let model;

    beforeAll(async () => {
        try {
            const modelPath = path.join(__dirname, './models/model.json');
            
            // Debug: Check if file exists and show first 100 chars
            const fs = require('fs');
            if (!fs.existsSync(modelPath)) {
                throw new Error(`Model file not found at ${modelPath}`);
            }
            model = await tf.loadLayersModel(`file://${modelPath}`);
            console.log('Model loaded successfully');
            const fileContent = fs.readFileSync(modelPath, 'utf8');
            console.log('File exists. First 100 chars:', fileContent.substring(0, 100));
            
            // Debug: Validate JSON
            JSON.parse(fileContent); // This should throw if invalid
            console.log('JSON is valid');
            
            model = await tf.loadLayersModel(`file://${modelPath}`);
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Model loading failed:', error);
            throw error;
        }
    });

  it('detects property search with location and price', async () => {
    const result = await detectIntent("Show me properties in SoHo under $3000");
    expect(result).toEqual({
      intent: 'property_search',
      location: 'soho',
      priceRange: 3000
    });
  });

  it('recognizes property detail requests', async () => {
    const result = await detectIntent("What about property #789?");
    expect(result).toEqual({
      intent: 'property_detail',
      id: '789'
    });
  });

  it('handles bedroom counts', async () => {
    const result = await detectIntent("2BR in Midtown");
    expect(result).toEqual({
      intent: 'property_search',
      location: 'midtown',
      bedrooms: 2
    });
  });
});
