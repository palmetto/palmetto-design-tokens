const addNewLines = (string, numberOfLines) => {
  if (!numberOfLines) {
    return string;
  }

  return `${string}${'\n'.repeat(numberOfLines)}`;
};

module.exports = addNewLines;