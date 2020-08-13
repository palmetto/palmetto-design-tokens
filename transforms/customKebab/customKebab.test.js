const customKebab = require('./customKebab');

describe('Custom Kebab Transform', () => {
  test('It should convert a dictionary prop path (Array) to a kebab-case string', () => {
    expect(customKebab.transformer(
      {
        path: ['one','two','three']
      },
    )).toBe('one-two-three');
  });

  test('It should handle adding a prefix', () => {
    expect(customKebab.transformer(
      {
        path: ['one','two','three']
      },
      {
        prefix: 'prefix'
      }
    )).toBe('prefix-one-two-three');
  });
});