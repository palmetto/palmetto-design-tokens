const StyleDictionary = require('style-dictionary');
const utilityClass = require('./formats/utilityClass');
const useSizeUnit = require('./transforms/useSizeUnit');
const customKebab = require('./transforms/customKebab');

console.log('Build started...');
console.log('\n==============================================');

// Register Custom Filters
StyleDictionary.registerFilter({
  name: 'isCategoryColor',
  matcher: (prop) => prop.attributes.category === 'color',
});

StyleDictionary.registerFilter({
  name: 'isCategorySize',
  matcher: (prop) => prop.attributes.category === 'size',
});

StyleDictionary.registerFormat(utilityClass);

StyleDictionary.registerTransform(useSizeUnit);
StyleDictionary.registerTransform(customKebab);

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
StyleDictionaryExtended = StyleDictionary.extend('./config.json');

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.cleanAllPlatforms();
StyleDictionaryExtended.buildAllPlatforms();


console.log('\n==============================================');
console.log('\nBuild completed!');
