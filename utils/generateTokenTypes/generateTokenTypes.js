const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const BABEL_OPTIONS = {
  plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'],
};
const colorTokens = require('../../build/json/variables-color.json');
const sizeTokens = require('../../build/json/variables-size.json');
const assetTokens = require('../../build/json/variables-asset.json');

/**
 * COLORS
 */
const brandColors = colorTokens.color.brand;
const BRAND_COLORS = 'BRAND_COLORS';
const FONT_COLORS = 'FONT_COLORS';
const BRAND_COLOR_NAMES = 'BRAND_COLOR_NAMES';

const brandColorOptions = [].concat.apply(
  [],
  Object.keys(brandColors).map(colorName =>
    Object.keys(brandColors[colorName]).map(colorGrade =>
      colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`,
    ),
  ),
);

const brandColorNames = Object.keys(brandColors);

const fontColorOptions = [].concat.apply(
  [],
  Object.keys(brandColors).map(colorName =>
    Object.keys(brandColors[colorName]).map(colorGrade =>
      colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`,
    ),
  ),
);

/**
 * SIZES
 */
const { size } = sizeTokens;

const borderSizeOptions = Object.keys(size.border);
const borderRadiusSizeOptions = Object.keys(size['border-radius']);
const boxShadowSizeOptions = Object.keys(size['box-shadow']);
const breakpointSizeOptions = Object.keys(size.breakpoint);
const fontSizeOptions = Object.keys(size.font);
const fontWeightOptions = Object.keys(size['font-weight']);
const heightSizeOptions = Object.keys(size.height);
const lineHeightSizeOptions = Object.keys(size['line-height']);
const opacitySizeOptions = Object.keys(size.opacity);
const spacingSizeOptions = Object.keys(size.spacing);
const widthSizeOptions = Object.keys(size.width);
const zIndexSizeOptions = Object.keys(size['z-index']);

const BORDER_SIZES = 'BORDER_SIZES';
const BORDER_RADIUS_SIZES = 'BORDER_RADIUS_SIZES';
const BOX_SHADOW_SIZES = 'BOX_SHADOW_SIZES';
const BREAKPOINT_SIZES = 'BREAKPOINT_SIZES';
const FONT_SIZES = 'FONT_SIZES';
const FONT_WEIGHTS = 'FONT_WEIGHTS';
const HEIGHT_SIZES = 'HEIGHT_SIZES';
const LINE_HEIGHT_SIZES = 'LINE_HEIGHT_SIZES';
const OPACITY_SIZES = 'OPACITY_SIZES';
const SPACING_SIZES = 'SPACING_SIZES';
const WIDTH_SIZES = 'WIDTH_SIZES';
const Z_INDEX_SIZES = 'Z_INDEX_SIZES';

/**
 * ASSETS 
 */
 const { asset } = assetTokens;

 const fontFamilyOptions = Object.keys(asset.fonts);

 const FONT_FAMILY_OPTIONS = 'FONT_FAMILY_OPTIONS';

/**
 * ICONS
 */
const sourceIconsDir = path.join(__dirname, '..', '..', 'icons/');
const iconFiles = fs
  .readdirSync(sourceIconsDir)
  .filter(fileName => path.extname(fileName).toLowerCase() === '.svg');
const iconNames = iconFiles.map(iconFile => iconFile.substr(0, iconFile.lastIndexOf('.')));
const ICON_NAMES = 'ICON_NAMES';

/**
 * UTILITY FUNCTIONS
 */
const writeArray = (array, arrayName, options = { lineBreak: true, asConst: true }) => {
  const { lineBreak, asConst } = options;

  let result = `const ${arrayName} = [`;

  array.forEach(element => {
    result = `${result}\n  '${element}',`;
  });

  return `${result}\n]${asConst ? ' as const' : ''};\n${lineBreak ? '\n' : ''}`;
};

const writeExport = string => 'export '.concat(string);

const writeUnionTypeFromArray = (typeName, arrayName) => {
  return `type ${typeName} = typeof ${arrayName}[number];\n`;
};

const createFileHeader = currentFile =>
  `/**\n* This file was auto-generated. DO NOT edit the contents of this file directly.\n*/\n\n${currentFile}`; // eslint-disable-line max-len

/**
 * TOKEN CONSTANT CREATION
 */
const createColorTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeExport(writeArray(brandColorOptions, BRAND_COLORS)));
  result = result.concat(writeExport(writeArray(fontColorOptions, FONT_COLORS)));
  result = result.concat(writeArray(brandColorNames, BRAND_COLOR_NAMES));

  return result;
};

const createSizeTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeArray(borderSizeOptions, BORDER_SIZES));
  result = result.concat(writeArray(borderRadiusSizeOptions, BORDER_RADIUS_SIZES));
  result = result.concat(writeArray(boxShadowSizeOptions, BOX_SHADOW_SIZES));
  result = result.concat(writeArray(breakpointSizeOptions, BREAKPOINT_SIZES));
  result = result.concat(writeArray(fontSizeOptions, FONT_SIZES));
  result = result.concat(writeArray(fontWeightOptions, FONT_WEIGHTS));
  result = result.concat(writeArray(heightSizeOptions, HEIGHT_SIZES));
  result = result.concat(writeArray(lineHeightSizeOptions, LINE_HEIGHT_SIZES));
  result = result.concat(writeArray(opacitySizeOptions, OPACITY_SIZES));
  result = result.concat(writeArray(spacingSizeOptions, SPACING_SIZES));
  result = result.concat(writeArray(widthSizeOptions, WIDTH_SIZES));
  result = result.concat(writeArray(zIndexSizeOptions, Z_INDEX_SIZES));

  return result;
};

const createAssetTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeArray(fontFamilyOptions, FONT_FAMILY_OPTIONS));

  return result;
}

const createIconNames = (currentFile, asConst = true) => {
  let result = currentFile;

  result = result.concat(writeExport(writeArray(iconNames, ICON_NAMES, { asConst })));

  return result;
};

/**
 * TYPE CREATION
 */
const createColorTypes = currentFile => {
  let result = currentFile;

  result = result.concat(writeExport(writeUnionTypeFromArray('BrandColor', BRAND_COLORS)));
  result = result.concat(writeExport(writeUnionTypeFromArray('FontColor', FONT_COLORS)));
  result = result.concat(writeExport(writeUnionTypeFromArray('ColorName', BRAND_COLOR_NAMES)));

  return result;
};

const createSizeTypes = currentFile => {
  let result = currentFile;

  result = result.concat(writeExport(writeUnionTypeFromArray('BorderSize', BORDER_SIZES)));
  result = result.concat(
    writeExport(writeUnionTypeFromArray('BorderRadiusSize', BORDER_RADIUS_SIZES)),
  );
  result = result.concat(writeExport(writeUnionTypeFromArray('BoxShadowSize', BOX_SHADOW_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('BreakpointSize', BREAKPOINT_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('FontSize', FONT_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('FontWeight', FONT_WEIGHTS)));
  result = result.concat(writeExport(writeUnionTypeFromArray('HeightSize', HEIGHT_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('LineHeightSize', LINE_HEIGHT_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('OpacitySize', OPACITY_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('SpacingSize', SPACING_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('WidthSize', WIDTH_SIZES)));
  result = result.concat(writeExport(writeUnionTypeFromArray('ZIndexSize', Z_INDEX_SIZES)));

  return result;
};


const createAssetTypes = currentFile => {
  let result = currentFile;
  result = result.concat(writeExport(writeUnionTypeFromArray('FontFamily', FONT_FAMILY_OPTIONS)));

  return result;
};

const createIconTypes = currentFile => {
  let result = currentFile;
  result = result.concat(writeExport(writeUnionTypeFromArray('IconName', ICON_NAMES)));

  return result;
};

/**
 * WRITE FILE
 */
const writeFile = () => {
  let tokensData = '';

  tokensData = createFileHeader(tokensData);
  tokensData = createColorTokens(tokensData);
  tokensData = createSizeTokens(tokensData);
  tokensData = createAssetTokens(tokensData);
  tokensData = createIconNames(tokensData);

  tokensData = createColorTypes(tokensData);
  tokensData = createSizeTypes(tokensData);
  tokensData = createAssetTypes(tokensData);
  tokensData = createIconTypes(tokensData);

  if (!fs.existsSync(`${__dirname}/../../build/types`)) {
    fs.mkdirSync(`${__dirname}/../../build/types`);
  }

  fs.writeFileSync(`${__dirname}/../../build/types/index.d.ts`, tokensData);

  let icons = '';
  icons = createFileHeader(icons);
  icons = babel.transformSync(createIconNames(icons, false), BABEL_OPTIONS).code;
  fs.writeFileSync(`${__dirname}/../../build/icons/index.js`, icons);
};

module.exports = writeFile;
