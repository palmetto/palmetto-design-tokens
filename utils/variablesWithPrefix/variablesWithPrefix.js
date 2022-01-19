function variablesWithPrefix(prefix, properties, commentStyle) {
  return properties.map(function(prop) {
      var to_ret_prop = prefix + prop.name + ': ' + prop.value + ';';

      if (prop.comment) {
        if (commentStyle === 'short') {
          to_ret_prop = to_ret_prop.concat(' // ' + prop.comment);
        } else {
          to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
        }
      }

      return to_ret_prop;
    })
    .filter(function(strVal) { return !!strVal })
    .join('\n');
}

module.exports = variablesWithPrefix;