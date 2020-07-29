var utilities = [
  {
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
    "variations": ["", "top", "right", "bottom", "left", "h", "v"],
  },
  {
    "name": "padding",
    "abbreviation": "p",
    "tokenCategory": "size",
    "tokenType": "spacing",
    "CSSprop": "padding",
    "variations": ["", "top", "right", "bottom", "left", "h", "v"],
  }
];

const utilityClass = {
  name: 'utilityClass',
  formatter: function (dictionary) {
    let output = '';
    dictionary.allProperties.forEach(prop => {
      const tokenCategory = prop.attributes.category;
      const tokenType = prop.attributes.type;

      // Most utilities that follow standard patterns.
      utilities.forEach(utility => {
        if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
          let utilityClass = `${utility.name}-${prop.attributes.item}`;
          if (prop.attributes.subitem && prop.attributes.subitem !== 'base') {
            utilityClass += `-${prop.attributes.subitem}`;
          }
          output += `.${utilityClass} { ${utility.CSSprop}: ${prop.value} }\n\n`;
        }
      });

      // Spacing utilities which follow specific patterns with multiple variations
      spacingUtilities.forEach(utility => {
        if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
          const single = ['top', 'right', 'bottom', 'left']; // CSS Atribute specifies the variation. E.G: 'margin-bottom: <value>'
          const compound = ['', 'h', 'v']; // CSS Attribute applied to multiple sides of an element: E.G: 'margin: <value> <value>'

          // Iterate through variations
          utility.variations.forEach(variation => {
            let property;
            let utilityClass;

            // Name the class with it's variation
            if (variation) utilityClass = `${utility.abbreviation}-${variation}-${prop.attributes.item}`;
            else utilityClass = `${utility.abbreviation}-${prop.attributes.item}`;

            // For specific sides of an element
            if (single.includes(variation)) {
              property = `${utility.name}-${variation}`;
              output += `.${utilityClass} { ${property}: ${prop.value} }\n\n`;
            } else if (compound.includes(variation)) { // For values applied to multiple sides.
              property = utility.name;
              if (variation === '') {
                output += `.${utilityClass} { ${property}: ${prop.value} }\n\n`;
              } else if (variation === 'h') {
                output += `.${utilityClass} { ${property}-left: ${prop.value}; ${property}-right: ${prop.value} }\n\n`;
              } else if (variation === 'v') {
                output += `.${utilityClass} { ${property}-top: ${prop.value}; ${property}-bottom: ${prop.value} }\n\n`;
              }
            }
          });
        }
      });
    });

    return output;
  },
};

module.exports = utilityClass;