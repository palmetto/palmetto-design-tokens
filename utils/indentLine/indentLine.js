const indentLine = (string, indentationLevel) => {
  if (!indentationLevel) {
    return string;
  }

  return `${' '.repeat(indentationLevel)}${string}`;
}

module.exports = indentLine;