const createFileHeader = require('../../utils/createFileHeader/createFileHeader');
const addNewLines = require('../../utils/addNewLines/addNewLines');
const indentLine = require('../../utils/indentLine/indentLine');

const utilities = [
  {
    name: 'font-color',
    tokenCategory: 'color',
    tokenType: 'font',
    cssProp: 'color',
    variations: ['']
  },
  {
    name: 'background-color',
    tokenCategory: 'color',
    tokenType: 'brand',
    cssProp: 'background-color',
    variations: ['']
  },
  {
    name: 'border-color',
    tokenCategory: 'color',
    tokenType: 'brand',
    cssProp: 'border-color',
    variations: ['']
  },
  {
    name: 'font-size',
    tokenCategory: 'size',
    tokenType: 'font',
    cssProp: 'font-size',
    variations: ['']
  },
  {
    name: 'border-radius',
    tokenCategory: 'size',
    tokenType: 'border-radius',
    cssProp: 'border-radius',
    variations: ['']
  },
  {
    name: 'margin',
    abbreviation: 'm',
    tokenCategory: 'size',
    tokenType: 'spacing',
    cssProp: 'margin',
    variations: ['', 'top', 'right', 'bottom', 'left', 'h', 'v'],
  },
  {
    name: 'padding',
    abbreviation: 'p',
    tokenCategory: 'size',
    tokenType: 'spacing',
    cssProp: 'padding',
    variations: ['', 'top', 'right', 'bottom', 'left', 'h', 'v'],
  },
];

const nestInsideMediaQuery = (css, breakpoint) => {
  let output = '';

  output += `@media (min-width: ${breakpoint.value}) {\n`;
  output += css;
  output += `}\n\n`;

  return output
}

const generateSpacingProperties = (utility, prop, variation) => {
  const single = ['top', 'right', 'bottom', 'left']; // CSS Atribute specifies the variation. E.G: 'margin-bottom: <value>'
  const compound = ['', 'h', 'v']; // CSS Attribute applied to multiple sides of an element: E.G: 'margin: <value> <value>'
  let property = utility.cssProp;
  let output;

  // For specific sides of an element
  if (single.includes(variation)) {
    property += `-${variation}`;
    output = `${property}: ${prop.value}`;
  } else if (compound.includes(variation)) { // For values applied to multiple sides.
    property = utility.cssProp;
    if (variation === '') {
      output = `${property}: ${prop.value}`;
    } else if (variation === 'h') {
      output = `${property}-left: ${prop.value}; ${property}-right: ${prop.value}`;
    } else if (variation === 'v') {
      output = `${property}-top: ${prop.value}; ${property}-bottom: ${prop.value}`;
    }
  }

  return output;
};

const generateUtilityClass = (utility, prop, variation, breakpoint) => {
  const tokenCategory = prop.attributes.category;
  const tokenType = prop.attributes.type;
  const { name, abbreviation } = utility;
  let utilityClass;

  if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
    utilityClass = `${abbreviation ? abbreviation : name}-${prop.attributes.item}`;

    if (prop.attributes.subitem && prop.attributes.subitem !== 'base') {
      utilityClass += `-${prop.attributes.subitem}`;
    }

    if (variation) {
      utilityClass += `-${variation}`;
    }

    if (breakpoint) {
      utilityClass += `-${breakpoint}`;
    }

    if (tokenType === 'spacing') {
      utilityClass = `.${utilityClass} { ${generateSpacingProperties(utility, prop, variation)} };`;
    } else {
      utilityClass = `.${utilityClass} { ${utility.cssProp}: ${prop.value} };`;
    }
  }

  return utilityClass;
}

const processUtilities = (utilities, prop, breakpoint, options = { indentationLevel: 0 }) => {
  const { indentationLevel } = options;
  let output = '';

  utilities.forEach(utility => {
    utility.variations.forEach((variation) => {
      const utilityClass = generateUtilityClass(utility, prop, variation, breakpoint);
      if (utilityClass) {
        output += addNewLines(indentLine(utilityClass, indentationLevel), 2)
      }
    });
  });

  return output;
};

const utilityClass = {
  name: 'css/utility-classes',
  formatter: function (dictionary) {
    let output = createFileHeader();
    const breakpoints = dictionary.allProperties.filter(prop => prop.attributes.type === 'breakpoint');
  
    dictionary.allProperties.forEach(prop => {
      output += processUtilities(utilities, prop);
    });

    breakpoints.forEach(breakpoint => {
      let responsiveUtilities = '';
      dictionary.allProperties.forEach(prop => {
        responsiveUtilities += processUtilities(utilities, prop, breakpoint.attributes.item, { indentationLevel: 2 });
      });
      output += nestInsideMediaQuery(responsiveUtilities, breakpoint);
    });

    return output;
  },
};

module.exports = utilityClass;