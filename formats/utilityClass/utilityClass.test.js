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

.font-color-primary-lightest { color: var(--color-brand-primary-lightest); }

.background-color-primary-lightest { background-color: var(--color-brand-primary-lightest); }

.border-color-primary-lightest { border-color: var(--color-brand-primary-lightest); }

.hover\\:font-color-primary-lightest:hover { color: var(--color-brand-primary-lightest); }

.hover\\:background-color-primary-lightest:hover { background-color: var(--color-brand-primary-lightest); }

.hover\\:border-color-primary-lightest:hover { border-color: var(--color-brand-primary-lightest); }

.focus\\:font-color-primary-lightest:focus { color: var(--color-brand-primary-lightest); }

.focus\\:background-color-primary-lightest:focus { background-color: var(--color-brand-primary-lightest); }

.focus\\:border-color-primary-lightest:focus { border-color: var(--color-brand-primary-lightest); }

.m-5xl { margin: var(--size-spacing-5xl); }

.m-top-5xl { margin-top: var(--size-spacing-5xl); }

.m-right-5xl { margin-right: var(--size-spacing-5xl); }

.m-bottom-5xl { margin-bottom: var(--size-spacing-5xl); }

.m-left-5xl { margin-left: var(--size-spacing-5xl); }

.m-h-5xl { margin-left: var(--size-spacing-5xl); margin-right: var(--size-spacing-5xl); }

.m-v-5xl { margin-top: var(--size-spacing-5xl); margin-bottom: var(--size-spacing-5xl); }

.p-5xl { padding: var(--size-spacing-5xl); }

.p-top-5xl { padding-top: var(--size-spacing-5xl); }

.p-right-5xl { padding-right: var(--size-spacing-5xl); }

.p-bottom-5xl { padding-bottom: var(--size-spacing-5xl); }

.p-left-5xl { padding-left: var(--size-spacing-5xl); }

.p-h-5xl { padding-left: var(--size-spacing-5xl); padding-right: var(--size-spacing-5xl); }

.p-v-5xl { padding-top: var(--size-spacing-5xl); padding-bottom: var(--size-spacing-5xl); }

.g-5xl { gap: var(--size-spacing-5xl); }

.rg-5xl { row-gap: var(--size-spacing-5xl); }

.cg-5xl { column-gap: var(--size-spacing-5xl); }

.border-width-xs { border-width: var(--size-border-xs); border-style: solid; }

.border-width-top-xs { border-top-width: var(--size-border-xs); border-top-style: solid; }

.border-width-right-xs { border-right-width: var(--size-border-xs); border-right-style: solid; }

.border-width-bottom-xs { border-bottom-width: var(--size-border-xs); border-bottom-style: solid; }

.border-width-left-xs { border-left-width: var(--size-border-xs); border-left-style: solid; }

.border-width-h-xs { border-left-width: var(--size-border-xs); border-right-width: var(--size-border-xs); border-left-style: solid; border-right-style: solid; }

.border-width-v-xs { border-top-width: var(--size-border-xs); border-bottom-width: var(--size-border-xs); border-top-style: solid; border-bottom-style: solid; }

.hover\\:border-width-xs:hover { border-width: var(--size-border-xs); border-style: solid; }

.hover\\:border-width-top-xs:hover { border-top-width: var(--size-border-xs); border-top-style: solid; }

.hover\\:border-width-right-xs:hover { border-right-width: var(--size-border-xs); border-right-style: solid; }

.hover\\:border-width-bottom-xs:hover { border-bottom-width: var(--size-border-xs); border-bottom-style: solid; }

.hover\\:border-width-left-xs:hover { border-left-width: var(--size-border-xs); border-left-style: solid; }

.hover\\:border-width-h-xs:hover { border-left-width: var(--size-border-xs); border-right-width: var(--size-border-xs); border-left-style: solid; border-right-style: solid; }

.hover\\:border-width-v-xs:hover { border-top-width: var(--size-border-xs); border-bottom-width: var(--size-border-xs); border-top-style: solid; border-bottom-style: solid; }

.focus\\:border-width-xs:focus { border-width: var(--size-border-xs); border-style: solid; }

.focus\\:border-width-top-xs:focus { border-top-width: var(--size-border-xs); border-top-style: solid; }

.focus\\:border-width-right-xs:focus { border-right-width: var(--size-border-xs); border-right-style: solid; }

.focus\\:border-width-bottom-xs:focus { border-bottom-width: var(--size-border-xs); border-bottom-style: solid; }

.focus\\:border-width-left-xs:focus { border-left-width: var(--size-border-xs); border-left-style: solid; }

.focus\\:border-width-h-xs:focus { border-left-width: var(--size-border-xs); border-right-width: var(--size-border-xs); border-left-style: solid; border-right-style: solid; }

.focus\\:border-width-v-xs:focus { border-top-width: var(--size-border-xs); border-bottom-width: var(--size-border-xs); border-top-style: solid; border-bottom-style: solid; }

.br-xs { border-radius: var(--size-border-radius-xs); }

.br-top-left-xs { border-top-left-radius: var(--size-border-radius-xs); }

.br-top-right-xs { border-top-right-radius: var(--size-border-radius-xs); }

.br-bottom-right-xs { border-bottom-right-radius: var(--size-border-radius-xs); }

.br-bottom-left-xs { border-bottom-left-radius: var(--size-border-radius-xs); }

@media (min-width: 1280px) {
  .m-5xl-hd { margin: var(--size-spacing-5xl); }

  .m-top-5xl-hd { margin-top: var(--size-spacing-5xl); }

  .m-right-5xl-hd { margin-right: var(--size-spacing-5xl); }

  .m-bottom-5xl-hd { margin-bottom: var(--size-spacing-5xl); }

  .m-left-5xl-hd { margin-left: var(--size-spacing-5xl); }

  .m-h-5xl-hd { margin-left: var(--size-spacing-5xl); margin-right: var(--size-spacing-5xl); }

  .m-v-5xl-hd { margin-top: var(--size-spacing-5xl); margin-bottom: var(--size-spacing-5xl); }

  .p-5xl-hd { padding: var(--size-spacing-5xl); }

  .p-top-5xl-hd { padding-top: var(--size-spacing-5xl); }

  .p-right-5xl-hd { padding-right: var(--size-spacing-5xl); }

  .p-bottom-5xl-hd { padding-bottom: var(--size-spacing-5xl); }

  .p-left-5xl-hd { padding-left: var(--size-spacing-5xl); }

  .p-h-5xl-hd { padding-left: var(--size-spacing-5xl); padding-right: var(--size-spacing-5xl); }

  .p-v-5xl-hd { padding-top: var(--size-spacing-5xl); padding-bottom: var(--size-spacing-5xl); }

  .g-5xl-hd { gap: var(--size-spacing-5xl); }

  .rg-5xl-hd { row-gap: var(--size-spacing-5xl); }

  .cg-5xl-hd { column-gap: var(--size-spacing-5xl); }

  .border-width-xs-hd { border-width: var(--size-border-xs); border-style: solid; }

  .border-width-top-xs-hd { border-top-width: var(--size-border-xs); border-top-style: solid; }

  .border-width-right-xs-hd { border-right-width: var(--size-border-xs); border-right-style: solid; }

  .border-width-bottom-xs-hd { border-bottom-width: var(--size-border-xs); border-bottom-style: solid; }

  .border-width-left-xs-hd { border-left-width: var(--size-border-xs); border-left-style: solid; }

  .border-width-h-xs-hd { border-left-width: var(--size-border-xs); border-right-width: var(--size-border-xs); border-left-style: solid; border-right-style: solid; }

  .border-width-v-xs-hd { border-top-width: var(--size-border-xs); border-bottom-width: var(--size-border-xs); border-top-style: solid; border-bottom-style: solid; }

  .br-xs-hd { border-radius: var(--size-border-radius-xs); }

  .br-top-left-xs-hd { border-top-left-radius: var(--size-border-radius-xs); }

  .br-top-right-xs-hd { border-top-right-radius: var(--size-border-radius-xs); }

  .br-bottom-right-xs-hd { border-bottom-right-radius: var(--size-border-radius-xs); }

  .br-bottom-left-xs-hd { border-bottom-left-radius: var(--size-border-radius-xs); }

  .hover\\:border-width-xs-hd:hover { border-width: var(--size-border-xs); border-style: solid; }

  .hover\\:border-width-top-xs-hd:hover { border-top-width: var(--size-border-xs); border-top-style: solid; }

  .hover\\:border-width-right-xs-hd:hover { border-right-width: var(--size-border-xs); border-right-style: solid; }

  .hover\\:border-width-bottom-xs-hd:hover { border-bottom-width: var(--size-border-xs); border-bottom-style: solid; }

  .hover\\:border-width-left-xs-hd:hover { border-left-width: var(--size-border-xs); border-left-style: solid; }

  .hover\\:border-width-h-xs-hd:hover { border-left-width: var(--size-border-xs); border-right-width: var(--size-border-xs); border-left-style: solid; border-right-style: solid; }

  .hover\\:border-width-v-xs-hd:hover { border-top-width: var(--size-border-xs); border-bottom-width: var(--size-border-xs); border-top-style: solid; border-bottom-style: solid; }

  .focus\\:border-width-xs-hd:focus { border-width: var(--size-border-xs); border-style: solid; }

  .focus\\:border-width-top-xs-hd:focus { border-top-width: var(--size-border-xs); border-top-style: solid; }

  .focus\\:border-width-right-xs-hd:focus { border-right-width: var(--size-border-xs); border-right-style: solid; }

  .focus\\:border-width-bottom-xs-hd:focus { border-bottom-width: var(--size-border-xs); border-bottom-style: solid; }

  .focus\\:border-width-left-xs-hd:focus { border-left-width: var(--size-border-xs); border-left-style: solid; }

  .focus\\:border-width-h-xs-hd:focus { border-left-width: var(--size-border-xs); border-right-width: var(--size-border-xs); border-left-style: solid; border-right-style: solid; }

  .focus\\:border-width-v-xs-hd:focus { border-top-width: var(--size-border-xs); border-bottom-width: var(--size-border-xs); border-top-style: solid; border-bottom-style: solid; }

}

`;

describe('utilityClass format', () => {
  test('produces utility classes for the dictionary', () => {
    const mockDate = new Date(1466424490000);

    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(utilityClass.formatter(mockDictionary)).toBe(expectedOutput);
  });
});
