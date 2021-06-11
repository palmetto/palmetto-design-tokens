const svgr = require('@svgr/core').default;
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const pascalCase = require('../pascalCase/pascalCase');
const createFileHeader = require('../createFileHeader/createFileHeader');
const indentLine = require('../indentLine/indentLine');

const BABEL_OPTIONS = {
  plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'],
};

async function createIconComponents() {
  const icons = {};

  const sourceIconsDir = path.join(__dirname, '..', '..', 'icons/');
  const buildIconsDir = path.join(__dirname, '..', '..', 'build', 'icons', 'react/');

  const svgFiles = fs
    .readdirSync(sourceIconsDir)
    .filter(fileName => path.extname(fileName).toLowerCase() === '.svg');

  svgFiles.forEach(function (filename) {
    const fileContent = fs.readFileSync(sourceIconsDir + filename, 'utf-8');
    icons[filename.substr(0, filename.lastIndexOf('.'))] = fileContent;
  });

  for (let i = 0; i < Object.keys(icons).length; i++) {
    const iconName = Object.keys(icons)[i];
    const componentName = pascalCase(iconName);

    const reactComponent = await svgr(icons[iconName], { icon: true }, { componentName });

    try {
      fs.readdirSync(buildIconsDir);
    } catch {
      fs.mkdirSync(buildIconsDir);
    }

    const compiledComponent = babel.transformSync(reactComponent, BABEL_OPTIONS);

    fs.writeFileSync(buildIconsDir + `${componentName}.js`, compiledComponent.code);
  }

  let iconComponentsIndexFile = '';
  let iconComponentsImports = '';
  let iconComponentsExport = `const icons = {\n`;
  iconComponentsIndexFile = createFileHeader(iconComponentsIndexFile);

  for (let i = 0; i < Object.keys(icons).length; i++) {
    const iconName = Object.keys(icons)[i];
    const componentName = pascalCase(iconName);
    iconComponentsImports = iconComponentsImports.concat(
      `import ${componentName} from './${componentName}';\n`,
    );
    iconComponentsExport = iconComponentsExport.concat(
      indentLine(`'${iconName}': ${componentName},\n`, 2),
    );
  }

  iconComponentsExport = iconComponentsExport.concat('};\n\n export default icons;\n');
  iconComponentsIndexFile = iconComponentsIndexFile.concat(iconComponentsImports);
  iconComponentsIndexFile = iconComponentsIndexFile.concat('\n');
  iconComponentsIndexFile = iconComponentsIndexFile.concat(iconComponentsExport);

  const compiledIndex = babel.transformSync(iconComponentsIndexFile, BABEL_OPTIONS);
  fs.writeFileSync(buildIconsDir + 'index.js', compiledIndex.code);
}

module.exports = createIconComponents;
