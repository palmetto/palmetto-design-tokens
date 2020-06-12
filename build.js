const StyleDictionary = require('style-dictionary');

console.log('Build started...');
console.log('\n==============================================');

// Register Custom Filters
StyleDictionary.registerFilter({
  name: 'isColor',
  matcher: (prop) => prop.attributes.category === 'color',
});

StyleDictionary.registerFilter({
  name: 'isFontSize',
  matcher: (prop) => prop.attributes.category === 'size',
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
StyleDictionaryExtended = StyleDictionary.extend('./config.json');


// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();


console.log('\n==============================================');
console.log('\nBuild completed!');