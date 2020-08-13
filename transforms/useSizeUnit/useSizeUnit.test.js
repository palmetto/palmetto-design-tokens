const useSizeUnit = require('./useSizeUnit');

describe('Use Size Unit Transform', () => {
  test('It should only match props of category size', () => {
    const sizeProp = { attributes: { category: 'size' } };
    const colorProp = { attributes: { category: 'color' } };

    expect(useSizeUnit.matcher(sizeProp)).toBe(true);
    expect(useSizeUnit.matcher(colorProp)).toBe(false);
  });

  test('It should transform a property value to include specified size unit', () => {
    const createSizeProp = (unit) => ({
      attributes: {
        category: 'size',
      },
      original: {
        value: 1,
        unit,
      }
    });

    expect(useSizeUnit.transformer(createSizeProp('rem'))).toBe('1rem');
    expect(useSizeUnit.transformer(createSizeProp('px'))).toBe('1px');
    expect(useSizeUnit.transformer(createSizeProp('em'))).toBe('1em');
    expect(useSizeUnit.transformer(createSizeProp('%'))).toBe('1%');
  });

  test('It should return the original value if no size is provided', () => {
    const sizeProp = {
      attributes: {
        type: 'size',
      },
      original: {
        value: 1,
      },
    };

    expect(useSizeUnit.transformer(sizeProp)).toBe(1);
  });
});