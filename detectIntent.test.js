const { detectIntent } = require('./intentDetector');
const tf = require('@tensorflow/tfjs-node');

describe('detectIntent()', () => {
    beforeAll(async () => {
        let model
        try {
          model = await tf.loadLayersModel('file://./models/model.json');
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
