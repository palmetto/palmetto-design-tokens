const useSizeUnit = {
  name: 'size/use-unit',
  type: 'value',
  matcher: function(prop) {
    return prop.attributes.category === 'size';
  },
  transformer: function(prop) {
    return prop.original.value + prop.original.unit;
  },
};

module.exports = useSizeUnit;