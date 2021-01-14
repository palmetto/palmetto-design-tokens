const createFileHeader = require('../../utils/createFileHeader/createFileHeader');
const addNewLines = require('../../utils/addNewLines/addNewLines');
const indentLine = require('../../utils/indentLine/indentLine');

const utilities = [{
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
  {
    name: 'width',
    abbreviation: 'w',
    tokenCategory: 'size',
    tokenType: 'width',
    cssProp: 'width',
    variations: [''],
  },
  {
    name: 'maxWidth',
    abbreviation: 'mw',
    tokenCategory: 'size',
    tokenType: 'width',
    cssProp: 'max-width',
    variations: [''],
  },
  {
    name: 'height',
    abbreviation: 'h',
    tokenCategory: 'size',
    tokenType: 'height',
    cssProp: 'height',
    variations: [''],
  },
  {
    name: 'maxHeight',
    abbreviation: 'mh',
    tokenCategory: 'size',
    tokenType: 'height',
    cssProp: 'max-height',
    variations: [''],
  },
  {
    name: 'border-width',
    tokenCategory: 'size',
    tokenType: 'border',
    cssProp: 'border',
    variations: ['', 'top', 'right', 'bottom', 'left', 'h', 'v'],
  },
  {
    name: 'font-weight',
    tokenCategory: 'size',
    tokenType: 'font-weight',
    cssProp: 'font-weight',
    variations: [''],
  },
  {
    name: 'box-shadow',
    abbreviation: 'shadow',
    tokenCategory: 'size',
    tokenType: 'box-shadow',
    cssProp: 'box-shadow',
    variations: [''],
  },
];

const nestInsideMediaQuery = (css, breakpoint) => {
  let output = '';

  output += `@media (min-width: ${breakpoint.value}) {\n`;
  output += css;
  output += `}\n\n`;

  return output
}

const generateShorthandProperties = (utility, prop, variation) => {
  const single = ['top', 'right', 'bottom', 'left']; // CSS Attribute specifies the variation. E.G: 'margin-bottom: <value>'
  const compound = ['', 'h', 'v']; // CSS Attribute applied to multiple sides of an element: E.G: 'margin: <value> <value>'
  let property = utility.cssProp;
  let output;

  // For specific sides of an element
  if (single.includes(variation)) {
    if (property === `border`) {
      output = `${property}-${variation}-width: ${prop.value}; ${property}-${variation}-style: solid;`;
    } else {
      property += `-${variation}`;
      output = `${property}: ${prop.value};`;
    }
  } else if (compound.includes(variation)) {
    // For values applied to multiple sides.
    property = utility.cssProp;
    if (variation === '') {
      if (property === 'border') {
        output = `${property}-width: ${prop.value}; ${property}-style: solid;`;
      } else {
        output = `${property}: ${prop.value};`;
      }
    } else if (variation === 'h') {
      if (property === 'border') {
        output = `${property}-left-width: ${prop.value}; ${property}-right-width: ${prop.value}; ${property}-left-style: solid; ${property}-right-style: solid;`;
      } else {
        output = `${property}-left: ${prop.value}; ${property}-right: ${prop.value};`;
      }
    } else if (variation === 'v') {
      if (property === 'border') {
        output = `${property}-top-width: ${prop.value}; ${property}-bottom-width: ${prop.value}; ${property}-top-style: solid; ${property}-bottom-style: solid;`;
      } else {
        output = `${property}-top: ${prop.value}; ${property}-bottom: ${prop.value};`;
      }
    }
  }

  return output;
};

// const generateCssBorderShorthand = (utility, prop, variation) => {
//   let property = utility.cssProp;
//   let output;

//   switch(variation) {
//     case '':
//       output = `${property}: ${prop.value};`;
//       break;
//     case 'top':
//       output = `${property}: ${prop.value} 0 0 0;`;
//       break;
//     case 'bottom':
//       output = `${property}: 0 0 ${prop.value} 0;`;
//       break;
//     case 'right':
//       output = `${property}: 0 ${prop.value} 0 0;`;
//       break;
//     case 'left':
//       output = `${property}: 0 0 0 ${prop.value}`;
//     case 'v':
//       output = `${property}: ${prop.value} 0`;
//     case 'h':
//       output = `${property}: 0 ${prop.value}`;
//   }

//   return output;
// };

const generateUtilityClass = (utility, prop, variation, breakpoint) => {
  const tokenCategory = prop.attributes.category;
  const tokenType = prop.attributes.type;
  const {
    name,
    abbreviation
  } = utility;
  let utilityClass;

  if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
    utilityClass = `${abbreviation ? abbreviation : name}`;

    if (variation) {
      utilityClass += `-${variation}`;
    }

    utilityClass += `-${prop.attributes.item}`

    if (prop.attributes.subitem && prop.attributes.subitem !== 'base') {
      utilityClass += `-${prop.attributes.subitem}`;
    }

    if (breakpoint) {
      utilityClass += `-${breakpoint}`;
    }

    if (tokenType === 'spacing' || name === 'border-width') {
      utilityClass = `.${utilityClass} { ${generateShorthandProperties(utility, prop, variation)} }`;
    } else {
      utilityClass = `.${utilityClass} { ${utility.cssProp}: ${prop.value}; }`;
    }
  }

  return utilityClass;
}

const processUtilities = (utilities, prop, breakpoint, options = {
  indentationLevel: 0
}) => {
  const {
    indentationLevel
  } = options;
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
    /**
     * Since our design system uses responsive, mobile-first design,
     * it is IMPERATIVE that these breakpoints be sorted in ascending order
     * by their min-width value. This ensures that whenever
     * there are two matching media queries, the LARGER one will win out.
     * E.G if the viewport width is 1300px, all media queries match, but if 
     * there is a class that is applied specifically for the 'hd' viewport
     * it should win out over the others. The only way to guarantee it
     * is to have these declared in order so the native CSS cascade works as intended.
     */
    const sortedBreakpoints = breakpoints.sort((a, b) => parseInt(a.original.value) - parseInt(b.original.value));
    
    /**
     * We depend on 'COLOR' category coming in before 'SIZE' category. This is important due
     * to CSS hierarchy of border and border-color properties. In order for border-color to successfully
     * override border it has to be declared after border.
     */
    dictionary.allProperties.forEach(prop => {
      output += processUtilities(utilities, prop);
    });

    sortedBreakpoints.forEach(breakpoint => {
      let responsiveUtilities = '';
      dictionary.allProperties.forEach(prop => {
        responsiveUtilities += processUtilities(utilities, prop, breakpoint.attributes.item, {
          indentationLevel: 2
        });
      });
      output += nestInsideMediaQuery(responsiveUtilities, breakpoint);
    });

    return output;
  },
};

module.exports = utilityClass;
