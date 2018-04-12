import { getQuoteSource } from './getQuoteSource';

describe('getTransportOptionLabel', () => {
  it('should return a string composed from the `quoteSource` and `quoteDateTime` arguments', () => {
    const quoteSource = '🚣';
    const quoteDateTime = 'someLabel';
    const actual = getQuoteSource(quoteSource, quoteDateTime);
    expect(actual).toBe(`${quoteSource} (${quoteDateTime})`);
  });
});
