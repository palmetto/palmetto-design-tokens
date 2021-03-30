const utilityClass = require('./utilityClass');

const mockDictionary = {
  allProperties: [
    {
      value: '#c3ecd8',
      original: { value: '{color.base.green.50.value}' },
      name: 'color-brand-primary-lightest',
      attributes: {
        category: 'color',
        type: 'brand',
        item: 'primary',
        subitem: 'lightest',
      },
      path: ['color', 'brand', 'primary', 'lightest'],
    },
    {
      value: '5rem',
      unit: 'rem',
      original: { value: '5', unit: 'rem' },
      name: 'size-spacing-5xl',
      attributes: { category: 'size', type: 'spacing', item: '5xl' },
      path: ['size', 'spacing', '5xl'],
    },
    {
      value: '1px',
      unit: 'px',
      original: { value: '1', unit: 'px' },
      name: 'size-border-width-xs',
      attributes: { category: 'size', type: 'border', item: 'xs' },
      path: ['size', 'border', 'xs'],
    },
    {
      value: '1280px',
      comment: 'large desktops and larger',
      unit: 'px',
      original: { value: '1280', comment: 'large desktops and larger', unit: 'px' },
      name: 'size-breakpoint-hd',
      attributes: { category: 'size', type: 'breakpoint', item: 'hd' },
      path: ['size', 'breakpoint', 'hd'],
    },
    {
      value: '1px',
      unit: 'px',
      original: { value: '1', unit: 'px' },
      name: 'size-border-radius-xs',
      attributes: { category: 'size', type: 'border-radius', item: 'xs' },
      path: ['size', 'border-radius', 'xs'],
    },
  ],
};

const expectedOutput = `/**
 * Do not edit directly
 * Generated on Mon, 20 Jun 2016 12:08:10 GMT
 */

.background-color-primary-lightest { background-color: #c3ecd8; }

.border-color-primary-lightest { border-color: #c3ecd8; }

.hover\\:background-color-primary-lightest:hover { background-color: #c3ecd8; }

.hover\\:border-color-primary-lightest:hover { border-color: #c3ecd8; }

.focus\\:background-color-primary-lightest:focus { background-color: #c3ecd8; }

.focus\\:border-color-primary-lightest:focus { border-color: #c3ecd8; }

.m-5xl { margin: 5rem; }

.m-top-5xl { margin-top: 5rem; }

.m-right-5xl { margin-right: 5rem; }

.m-bottom-5xl { margin-bottom: 5rem; }

.m-left-5xl { margin-left: 5rem; }

.m-h-5xl { margin-left: 5rem; margin-right: 5rem; }

.m-v-5xl { margin-top: 5rem; margin-bottom: 5rem; }

.p-5xl { padding: 5rem; }

.p-top-5xl { padding-top: 5rem; }

.p-right-5xl { padding-right: 5rem; }

.p-bottom-5xl { padding-bottom: 5rem; }

.p-left-5xl { padding-left: 5rem; }

.p-h-5xl { padding-left: 5rem; padding-right: 5rem; }

.p-v-5xl { padding-top: 5rem; padding-bottom: 5rem; }

.border-width-xs { border-width: 1px; border-style: solid; }

.border-width-top-xs { border-top-width: 1px; border-top-style: solid; }

.border-width-right-xs { border-right-width: 1px; border-right-style: solid; }

.border-width-bottom-xs { border-bottom-width: 1px; border-bottom-style: solid; }

.border-width-left-xs { border-left-width: 1px; border-left-style: solid; }

.border-width-h-xs { border-left-width: 1px; border-right-width: 1px; border-left-style: solid; border-right-style: solid; }

.border-width-v-xs { border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; }

.hover\\:border-width-xs:hover { border-width: 1px; border-style: solid; }

.hover\\:border-width-top-xs:hover { border-top-width: 1px; border-top-style: solid; }

.hover\\:border-width-right-xs:hover { border-right-width: 1px; border-right-style: solid; }

.hover\\:border-width-bottom-xs:hover { border-bottom-width: 1px; border-bottom-style: solid; }

.hover\\:border-width-left-xs:hover { border-left-width: 1px; border-left-style: solid; }

.hover\\:border-width-h-xs:hover { border-left-width: 1px; border-right-width: 1px; border-left-style: solid; border-right-style: solid; }

.hover\\:border-width-v-xs:hover { border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; }

.focus\\:border-width-xs:focus { border-width: 1px; border-style: solid; }

.focus\\:border-width-top-xs:focus { border-top-width: 1px; border-top-style: solid; }

.focus\\:border-width-right-xs:focus { border-right-width: 1px; border-right-style: solid; }

.focus\\:border-width-bottom-xs:focus { border-bottom-width: 1px; border-bottom-style: solid; }

.focus\\:border-width-left-xs:focus { border-left-width: 1px; border-left-style: solid; }

.focus\\:border-width-h-xs:focus { border-left-width: 1px; border-right-width: 1px; border-left-style: solid; border-right-style: solid; }

.focus\\:border-width-v-xs:focus { border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; }

.br-xs { border-radius: 1px; }

.br-top-left-xs { border-top-left-radius: 1px; }

.br-top-right-xs { border-top-right-radius: 1px; }

.br-bottom-right-xs { border-bottom-right-radius: 1px; }

.br-bottom-left-xs { border-bottom-left-radius: 1px; }

@media (min-width: 1280px) {
  .m-5xl-hd { margin: 5rem; }

  .m-top-5xl-hd { margin-top: 5rem; }

  .m-right-5xl-hd { margin-right: 5rem; }

  .m-bottom-5xl-hd { margin-bottom: 5rem; }

  .m-left-5xl-hd { margin-left: 5rem; }

  .m-h-5xl-hd { margin-left: 5rem; margin-right: 5rem; }

  .m-v-5xl-hd { margin-top: 5rem; margin-bottom: 5rem; }

  .p-5xl-hd { padding: 5rem; }

  .p-top-5xl-hd { padding-top: 5rem; }

  .p-right-5xl-hd { padding-right: 5rem; }

  .p-bottom-5xl-hd { padding-bottom: 5rem; }

  .p-left-5xl-hd { padding-left: 5rem; }

  .p-h-5xl-hd { padding-left: 5rem; padding-right: 5rem; }

  .p-v-5xl-hd { padding-top: 5rem; padding-bottom: 5rem; }

  .border-width-xs-hd { border-width: 1px; border-style: solid; }

  .border-width-top-xs-hd { border-top-width: 1px; border-top-style: solid; }

  .border-width-right-xs-hd { border-right-width: 1px; border-right-style: solid; }

  .border-width-bottom-xs-hd { border-bottom-width: 1px; border-bottom-style: solid; }

  .border-width-left-xs-hd { border-left-width: 1px; border-left-style: solid; }

  .border-width-h-xs-hd { border-left-width: 1px; border-right-width: 1px; border-left-style: solid; border-right-style: solid; }

  .border-width-v-xs-hd { border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; }

  .br-xs-hd { border-radius: 1px; }

  .br-top-left-xs-hd { border-top-left-radius: 1px; }

  .br-top-right-xs-hd { border-top-right-radius: 1px; }

  .br-bottom-right-xs-hd { border-bottom-right-radius: 1px; }

  .br-bottom-left-xs-hd { border-bottom-left-radius: 1px; }

  .hover\\:border-width-xs-hd:hover { border-width: 1px; border-style: solid; }

  .hover\\:border-width-top-xs-hd:hover { border-top-width: 1px; border-top-style: solid; }

  .hover\\:border-width-right-xs-hd:hover { border-right-width: 1px; border-right-style: solid; }

  .hover\\:border-width-bottom-xs-hd:hover { border-bottom-width: 1px; border-bottom-style: solid; }

  .hover\\:border-width-left-xs-hd:hover { border-left-width: 1px; border-left-style: solid; }

  .hover\\:border-width-h-xs-hd:hover { border-left-width: 1px; border-right-width: 1px; border-left-style: solid; border-right-style: solid; }

  .hover\\:border-width-v-xs-hd:hover { border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; }

  .focus\\:border-width-xs-hd:focus { border-width: 1px; border-style: solid; }

  .focus\\:border-width-top-xs-hd:focus { border-top-width: 1px; border-top-style: solid; }

  .focus\\:border-width-right-xs-hd:focus { border-right-width: 1px; border-right-style: solid; }

  .focus\\:border-width-bottom-xs-hd:focus { border-bottom-width: 1px; border-bottom-style: solid; }

  .focus\\:border-width-left-xs-hd:focus { border-left-width: 1px; border-left-style: solid; }

  .focus\\:border-width-h-xs-hd:focus { border-left-width: 1px; border-right-width: 1px; border-left-style: solid; border-right-style: solid; }

  .focus\\:border-width-v-xs-hd:focus { border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid; }

}

`;

describe('utilityClass format', () => {
  test('produces utility classes for the dictionary', () => {
    const mockDate = new Date(1466424490000);

    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(utilityClass.formatter(mockDictionary)).toBe(expectedOutput);
  });
});
