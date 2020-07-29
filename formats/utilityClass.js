const utilities = [
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
  },
];

const processUtilities = (utilities, prop, breakpoint, options = { indentationLevel: 0 }) => {
  const { indentationLevel } = options;
  let output = '';
  const tokenCategory = prop.attributes.category;
  const tokenType = prop.attributes.type;

  utilities.forEach(utility => {
    if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
      let utilityClass = `${utility.name}-${prop.attributes.item}`;
      if (prop.attributes.subitem && prop.attributes.subitem !== 'base') {
        utilityClass += `-${prop.attributes.subitem}`;
      }
      if (breakpoint) {
        utilityClass += `-${breakpoint}`;
      }
      output += `${' '.repeat(indentationLevel)}.${utilityClass} { ${utility.CSSprop}: ${prop.value} }\n\n`;
    }
  });
  return output;
};

const processSpacingUtilities = (spacingUtilities, prop, breakpoint, options = { indentationLevel: 0 }) => {
  const { indentationLevel } = options;
  let output = '';
  const tokenCategory = prop.attributes.category;
  const tokenType = prop.attributes.type;

  spacingUtilities.forEach(utility => {
    if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
      const single = ['top', 'right', 'bottom', 'left']; // CSS Atribute specifies the variation. E.G: 'margin-bottom: <value>'
      const compound = ['', 'h', 'v']; // CSS Attribute applied to multiple sides of an element: E.G: 'margin: <value> <value>'

      // Iterate through variations
      utility.variations.forEach(variation => {
        let property;
        let utilityClass = ''.padStart(indentationLevel, ' ');

        // Name the class with its variation
        if (variation) {
          utilityClass = `${utility.abbreviation}-${variation}-${prop.attributes.item}`;
        } else {
          utilityClass = `${utility.abbreviation}-${prop.attributes.item}`;
        }

        if (breakpoint) {
          utilityClass += `-${breakpoint}`;
        }

        // For specific sides of an element
        if (single.includes(variation)) {
          property = `${utility.name}-${variation}`;
          output += `${' '.repeat(indentationLevel)}.${utilityClass} { ${property}: ${prop.value} }\n\n`;
        } else if (compound.includes(variation)) { // For values applied to multiple sides.
          property = utility.CSSprop;
          if (variation === '') {
            output += `${' '.repeat(indentationLevel)}.${utilityClass} { ${property}: ${prop.value} }\n\n`;
          } else if (variation === 'h') {
            output += `${' '.repeat(indentationLevel)}.${utilityClass} { ${property}-left: ${prop.value}; ${property}-right: ${prop.value} }\n\n`;
          } else if (variation === 'v') {
            output += `${' '.repeat(indentationLevel)}.${utilityClass} { ${property}-top: ${prop.value}; ${property}-bottom: ${prop.value} }\n\n`;
          }
        }
      });
    }
  });

  return output;
}

const utilityClass = {
  name: 'utilityClass',
  formatter: function (dictionary) {
    let output = '';
    const breakpoints = dictionary.allProperties.filter(prop => prop.attributes.category === 'size' && prop.attributes.type === 'breakpoint');

    dictionary.allProperties.forEach(prop => {
      // Most utilities that follow standard patterns.
      output += processUtilities(utilities, prop);
      // Spacing utilities which follow specific patterns with multiple variations
      output += processSpacingUtilities(spacingUtilities, prop);
    });

    breakpoints.forEach(breakpoint => {
      output += `@media (min-width: ${breakpoint.value}) {\n`;
      dictionary.allProperties.forEach(prop => {
        output += processUtilities(utilities, prop, breakpoint.attributes.item, { indentationLevel: 2 });
        output += processSpacingUtilities(spacingUtilities, prop, breakpoint.attributes.item, { indentationLevel: 2 });
      });
      output += `}\n\n`;
    });

    return output;
  },
};

module.exports = utilityClass;