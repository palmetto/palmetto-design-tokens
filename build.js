const StyleDictionary = require('style-dictionary');

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

StyleDictionary.registerFilter({
  name: 'isCategorySizeAndTypeFont',
  matcher: (prop) => prop.attributes.category === 'size' && prop.attributes.type === 'font',
});

StyleDictionary.registerFilter({
  name: 'isNotTypeBase',
  matcher: (prop) => prop.attributes.type !== 'base',
});

var utilities = [
  {
      "name": "font-color",
      "tokenType": "color",
      "CSSprop": "color"
  },
  {
      "name": "background-color",
      "tokenType": "color",
      "CSSprop": "background-color"
  },
  {
    "name": "font-size",
    "tokenType": "size",
    "CSSprop": "font-size"
}
];


StyleDictionary.registerFormat({
  name: 'utilityClass',
  formatter: function(dictionary, platform) {
    let output = '';
    dictionary.allProperties.forEach(function(prop) {
      const tokenType = prop.path.slice(0,1)[0];

      utilities.forEach(function(utility) {
        if (tokenType === utility.tokenType) {
          let utilityClass = `${utility.name}-${prop.attributes.item}`;
          if (prop.attributes.subitem && prop.attributes.subitem !== 'base') {
            utilityClass += `-${prop.attributes.subitem}`;
          }
          output += `.${utilityClass} { ${utility.CSSprop}: ${prop.value} }\n\n`
        }
      });
    });

    return output;
  }
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
StyleDictionaryExtended = StyleDictionary.extend('./config.json');


// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();


console.log('\n==============================================');
console.log('\nBuild completed!');