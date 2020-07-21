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
  name: 'isCategorySizeAndTypeBorderRadius',
  matcher: (prop) => prop.attributes.category === 'size' && prop.attributes.type === 'border-radius',
});

StyleDictionary.registerFilter({
  name: 'isNotTypeBase',
  matcher: (prop) => prop.attributes.type !== 'base',
});

var utilities = [{
    "name": "font-color",
    "tokenCategory": "color",
    "tokenType": "font",
    "CSSprop": "color"
  },
  {
    "name": "background-color",
    "tokenCategory": "color",
    "tokenType": "brand",
    "CSSprop": "background-color"
  },
  {
    "name": "border-color",
    "tokenCategory": "color",
    "tokenType": "brand",
    "CSSprop": "border-color"
  },
  {
    "name": "font-size",
    "tokenCategory": "size",
    "tokenType": "font",
    "CSSprop": "font-size"
  },
  {
    "name": "border-radius",
    "tokenCategory": "size",
    "tokenType": "border-radius",
    "CSSprop": "border-radius"
  },
];

const spacingUtilities = [
  {
    "name": "margin",
    "abbreviation": "m",
    "tokenCategory": "size",
    "tokenType": "spacing",
    "CSSprop": "margin",
    "variations": ["all", "top", "right", "bottom", "left", "x", "y"],
  },
  {
    "name": "padding",
    "abbreviation": "p",
    "tokenCategory": "size",
    "tokenType": "spacing",
    "CSSprop": "padding",
    "variations": ["all", "top", "right", "bottom", "left", "x", "y"],
  },
]


StyleDictionary.registerFormat({
  name: 'utilityClass',
  formatter: function (dictionary, platform) {
    let output = '';
    dictionary.allProperties.forEach(prop => {
      const tokenCategory = prop.attributes.category;
      const tokenType = prop.attributes.type;

      utilities.forEach(utility => {
        if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
          let utilityClass = `${utility.name}-${prop.attributes.item}`;
          if (prop.attributes.subitem && prop.attributes.subitem !== 'base') {
            utilityClass += `-${prop.attributes.subitem}`;
          }
          output += `.${utilityClass} { ${utility.CSSprop}: ${prop.value} }\n\n`;
        }
      });

      spacingUtilities.forEach(utility => {
        if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
          const single = ['top', 'right', 'bottom', 'left'];
          const compound = ['all', 'x', 'y'];
          utility.variations.forEach(variation => {
            let property;
            let utilityClass = `${utility.abbreviation}-${variation}-${prop.attributes.item}`;
            if (single.includes(variation)) {
              property = `${utility.name}-${variation}`;
              output += `.${utilityClass} { ${property}: ${prop.value} }\n\n`;
            }
            else if (compound.includes(variation)) {
              property = utility.name;
              if (variation === 'all') {
                output += `.${utilityClass} { ${property}: ${prop.value} }\n\n`; 
              } else if (variation === 'x') {
                output += `.${utilityClass} { ${property}: 0 ${prop.value} 0 ${prop.value} }\n\n`; 
              } else if (variation === 'y') {
                output += `.${utilityClass} { ${property}: ${prop.value} 0 ${prop.value} 0 }\n\n`; 
              }
            }
          });
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
