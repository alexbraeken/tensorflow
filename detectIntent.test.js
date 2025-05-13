const { detectIntent } = require('./intentDetector');
const tf = require('@tensorflow/tfjs-node');

describe('detectIntent()', () => {
  beforeAll(() => {
    tf.env().set('IS_TEST', true);
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
