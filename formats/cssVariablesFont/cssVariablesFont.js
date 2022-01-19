const createFileHeader = require('../../utils/createFileHeader/createFileHeader');
const addNewLines = require('../../utils/addNewLines/addNewLines');
const variablesWithPrefix = require('../../utils/variablesWithPrefix/variablesWithPrefix');


const cssVariablesFont = {
  name: 'css/variables/font',
  formatter: function (dictionary) {
    let output = createFileHeader();
    
    output += addNewLines(':root {', 1);
    output += variablesWithPrefix('  --', dictionary.allProperties)
    output = addNewLines(output, 1);
    output = addNewLines(`${output}}`, 1);

    return output;
  },
};

module.exports = cssVariablesFont;
