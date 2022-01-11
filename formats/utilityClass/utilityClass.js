const createFileHeader = require('../../utils/createFileHeader/createFileHeader');
const addNewLines = require('../../utils/addNewLines/addNewLines');
const indentLine = require('../../utils/indentLine/indentLine');
const nestInsideMediaQuery = require('../../utils/nestInsideMediaQuery/nestInsideMediaQuery');
const utilities = require('./utilitiesConfig');

const generateCssVariable = (prop) => {
  const {
    category,
    type,
    item,
    subitem,
  } = prop.attributes;

  return `var(--${category}-${type}-${item}${subitem ? '-' + subitem : ''})`;
}

const generateShorthandProperties = (utility, prop, variation) => {
  const single = ['top', 'right', 'bottom', 'left']; // CSS Attribute specifies the variation. E.G: 'margin-bottom: <value>'
  const compound = ['', 'h', 'v']; // CSS Attribute applied to multiple sides of an element: E.G: 'margin: <value> <value>'
  let property = utility.cssProp;
  let output;

  const value = generateCssVariable(prop);

  // For specific sides of an element
  if (single.includes(variation)) {
    if (property === `border`) {
      output = `${property}-${variation}-width: ${value}; ${property}-${variation}-style: solid;`;
    } else {
      property += `-${variation}`;
      output = `${property}: ${value};`;
    }
  } else if (compound.includes(variation)) {
    // For values applied to multiple sides.
    property = utility.cssProp;
    if (variation === '') {
      if (property === 'border') {
        output = `${property}-width: ${value}; ${property}-style: solid;`;
      } else {
        output = `${property}: ${value};`;
      }
    } else if (variation === 'h') {
      if (property === 'border') {
        output = `${property}-left-width: ${value}; ${property}-right-width: ${value}; ${property}-left-style: solid; ${property}-right-style: solid;`;
      } else {
        output = `${property}-left: ${value}; ${property}-right: ${value};`;
      }
    } else if (variation === 'v') {
      if (property === 'border') {
        output = `${property}-top-width: ${value}; ${property}-bottom-width: ${value}; ${property}-top-style: solid; ${property}-bottom-style: solid;`;
      } else {
        output = `${property}-top: ${value}; ${property}-bottom: ${value};`;
      }
    }
  }

  return output;
};

const generateBorderRadiusShorthandProperties = (utility, prop, variation) => {
  const single = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
  let property = utility.cssProp;
  let output;

  const value = generateCssVariable(prop);

  // For specific corners of the element
  if (single.includes(variation)) {
    property += `-${variation}`;
    output = `border-${variation}-radius: ${value};`;
  } else { // all corners of the element
    output = `${property}: ${value};`;
  }

  return output;
};

const generateUtilityClass = (utility, prop, variation, breakpoint, state) => {
  const tokenCategory = prop.attributes.category;
  const tokenType = prop.attributes.type;

  const {
    name,
    abbreviation,
    hover,
  } = utility;
  let utilityClass = '';

  if (tokenCategory === utility.tokenCategory && tokenType === utility.tokenType) {
    utilityClass += `${abbreviation ? abbreviation : name}`;

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

    if (state) {
      utilityClass = `${state}${'\\:'}${utilityClass}:${state}`;
    }

    if (tokenType === 'spacing' || name === 'border-width') {
      utilityClass = `.${utilityClass} { ${generateShorthandProperties(utility, prop, variation)} }`;
    } else if (tokenType === 'border-radius') {
      utilityClass = `.${utilityClass} { ${generateBorderRadiusShorthandProperties(utility, prop, variation)} }`;
    } else {
      utilityClass = `.${utilityClass} { ${utility.cssProp}: ${generateCssVariable(prop)}; }`;
    }
  }

  return utilityClass;
}

const processUtilities = (utilities, prop, breakpoint, options = {
  indentationLevel: 0,
  state: null,
}) => {
  const {
    indentationLevel,
    state,
  } = options;
  let output = '';

  utilities.forEach(utility => {
    utility.variations.forEach((variation) => {
      const utilityClass = generateUtilityClass(utility, prop, variation, breakpoint, state);
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

      /**
       * Hover States
       */
      const hoverUtilities = utilities.filter(utility => utility.hover);
      output += processUtilities(hoverUtilities, prop, null, { state: 'hover' });

      /**
       * Focus States
       */
      const focusUtilities = utilities.filter(utility => utility.hover);
      output += processUtilities(focusUtilities, prop, null, { state: 'focus' });
    });

    sortedBreakpoints.forEach(breakpoint => {
      let responsiveUtilityClasses = '';
      let responsiveUtilities = utilities.filter(utility => utility.responsive);
      let responsiveAndHoverUtilities = responsiveUtilities.filter(utility => utility.hover);
      let responsiveAndFocusUtilities = responsiveUtilities.filter(utility => utility.focus);

      dictionary.allProperties.forEach(prop => {
        responsiveUtilityClasses += processUtilities(responsiveUtilities, prop, breakpoint.attributes.item, {
          indentationLevel: 2,
        });
      });

      dictionary.allProperties.forEach(prop => {
        responsiveUtilityClasses += processUtilities(responsiveAndHoverUtilities, prop, breakpoint.attributes.item, {
          indentationLevel: 2,
          state: 'hover',
        });
      });

      dictionary.allProperties.forEach(prop => {
        responsiveUtilityClasses += processUtilities(responsiveAndFocusUtilities, prop, breakpoint.attributes.item, {
          indentationLevel: 2,
          state: 'focus',
        });
      });

      output += nestInsideMediaQuery(responsiveUtilityClasses, breakpoint);
    });

    return output;
  },
};

module.exports = utilityClass;
