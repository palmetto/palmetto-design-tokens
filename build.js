require('dotenv').config();
const StyleDictionary = require('style-dictionary');
const getFigmaDocument = require('./utils/getFigmaDocument/getFigmaDocument');
const parseFigmaDocumentTokens = require('./utils/parseFigmaDocumentTokens/parseFigmaDocumentTokens');
const mapSemanticColors = require('./utils/mapSemanticColors/mapSemanticColors');
const dictionaryConfig = require('./config.json');
const utilityClass = require('./formats/utilityClass/utilityClass');
const useSizeUnit = require('./transforms/useSizeUnit/useSizeUnit');
const customKebab = require('./transforms/customKebab/customKebab');

console.log('Build started...');
console.log('\n==============================================');

// Register Custom Filters 
StyleDictionary.registerFilter({
  name: 'isCategoryColor',
  matcher: prop => prop.attributes.category === 'color',
});

StyleDictionary.registerFilter({
  name: 'isCategorySize',
  matcher: prop => prop.attributes.category === 'size',
});

StyleDictionary.registerFilter({
  name: 'isBrandColor',
  matcher: prop => prop.attributes.category === 'color' && prop.attributes.type === 'brand',
});

StyleDictionary.registerFormat(utilityClass);

StyleDictionary.registerTransform(useSizeUnit);
StyleDictionary.registerTransform(customKebab);

/**
 * FIGMA TOKENS DOCUMENT
 * Id for document where we read tokens. In theory this should never change.
 */
const FIGMA_TOKENS_DOCUMENT = 'abGRptpr7iPaMsXdEPVm6W';

/**
 * FIGMA FILE VERSION
 * The version of the tokens figma file you want to use to build.
 * If you want to publish an updated package,
 * simply bump this version and then merge a PR with the change.
 * Ideally the figma file version _label_ and the npm package version will match
 * but it is not required.
 */
const FIGMA_FILE_VERSION = '549892788';

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
getFigmaDocument(FIGMA_TOKENS_DOCUMENT, FIGMA_FILE_VERSION)
  .then(json => {
    /**
     * Generate dictionary by recursively parsing FIGMA tokens document.
     */
    let properties = parseFigmaDocumentTokens(json.document);

    /**
     * Generate semantic (light, lighter, etc...) colors
     * from lightness numbers (50, 100, etc...)
     * It keeps the original colors as well as the semantic versions.
     */
    properties = mapSemanticColors(properties);

    const StyleDictionaryExtended = StyleDictionary.extend({
      properties,
      platforms: dictionaryConfig.platforms,
    });

    // FINALLY, BUILD ALL THE PLATFORMS
    StyleDictionaryExtended.cleanAllPlatforms();
    StyleDictionaryExtended.buildAllPlatforms();
    console.log('\n==============================================');
    console.log('\nStyle dictionary build completed!');

    // From the built dictionary, generate constants of all token options.
    // File can't be required at the top since build files do not exist until the style dictionary is built.
    const generateTokenTypes = require('./utils/generateTokenTypes/generateTokenTypes');
    generateTokenTypes();
    console.log('\n==============================================');
    console.log('\nToken types generated!');

    console.log('\n==============================================');
    console.log('\nAll done!');
    console.log('\n==============================================');
  })
  .catch(err => console.log(err));
