const colorMap = {
  '50': 'lightest',
  '100': 'lighter',
  '300': 'light',
  '500': 'base',
  '600': 'dark',
  '700': 'darker',
  '800': 'darkest',
};

const mapSemanticColors = (properties) => {
  const updatedProperties = { ...properties };
  const colors = { ...updatedProperties.color };

  // Color Types are BRAND, FONT, BORDER.
  Object.keys(colors).forEach(colorType => {
    // Excluding border since they don't follow the traditional lightness scale.
    if (colorType !== 'border') {
      // Color names are primary, secondary, danger, etc...
      Object.keys(colors[colorType]).forEach(colorName => {
        // Only create semantic variations for colors that have a lightness scale (50, 100, etc...)
        if (Object.keys(colors[colorType][colorName]).length > 1) {
          Object.keys(colorMap).forEach(colorVariation => {
            colors[colorType][colorName][colorMap[colorVariation]] = {
              value: colors[colorType][colorName][colorVariation].value,
            };
          });
        } else {
          // For colors without a scale, just use the 500 value to create a `base` variable.
          Object.keys(colors[colorType][colorName]).forEach(() => {
            colors[colorType][colorName][colorMap['500']] = {
              value: colors[colorType][colorName]['500'].value,
            }
          });
        }
      });
    }
  });

  updatedProperties.color = { ...colors };

  return updatedProperties;
}

module.exports = mapSemanticColors;