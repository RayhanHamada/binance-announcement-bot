import genSha256 from './genSha256';

describe('utils/genSHA256', () => {
  it('should generate 64 character', () => {
    expect(genSha256('test')).toHaveLength(64);
  });
});
