const useSizeUnit = {
  name: 'size/use-unit',
  type: 'value',
  matcher: function(prop) {
    return prop.attributes.category === 'size';
  },
  transformer: function(prop) {
    if (!prop.original.unit) {
      return prop.original.value;
    }

    return prop.original.value + prop.original.unit;
  },
};

module.exports = useSizeUnit;