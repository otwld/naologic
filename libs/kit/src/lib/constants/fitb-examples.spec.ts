import { FITB_EXAMPLES, isFITBExampleName } from './fitb-examples';

describe('FITB_EXAMPLES', () => {
  it('should have a Naologic widget', () => {
    expect(FITB_EXAMPLES['Naologic widget']).toBeTruthy();
  });

  it('should return true for string to FITBExampleName', () => {
    expect(isFITBExampleName('Naologic widget')).toBe(true);
  });
});
