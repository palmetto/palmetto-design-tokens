const colorMap = {
  '50': 'lightest',
  '100': 'lighter',
  '300': 'light',
  '500': 'base',
  '600': 'dark',
  '700': 'darker',
  '800': 'darkest',
};

const excludedColors = ['white', 'black', 'dark', 'light'];

const mapSemanticColors = (properties) => {
  const updatedProperties = { ...properties };
  Object.keys(updatedProperties.color.brand).forEach(color => {
    if (!excludedColors.includes(color)) {
      Object.keys(colorMap).forEach(colorVariation => {
        console.log(color, colorVariation);
        updatedProperties.color.brand[color][colorMap[colorVariation]] = {
          value: updatedProperties.color.brand[color][colorVariation].value,
        };
      });
    }
  });
  console.log(updatedProperties.color.brand);
  return updatedProperties;
}

module.exports = mapSemanticColors;