const createFileHeader = (commentStyle) => {
  let output = ''
  if (commentStyle === 'short') {
    output += '\n';
    output += '// Do not edit directly\n';
    output += '// Generated on ' + new Date().toUTCString() + '\n';
    output += '\n';
  } else {
    output += '/**\n';
    output += ' * Do not edit directly\n';
    output += ' * Generated on ' + new Date().toUTCString() + '\n';
    output += ' */\n\n';
  }

  return output;
};

module.exports = createFileHeader;