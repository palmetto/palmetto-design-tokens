const indentLine = require('./indentLine');

const testCases = [
  { input: ['hello', 2], expectedOutput: '  hello' },
  { input: ['hello', 10], expectedOutput: '          hello' },
  { input: ['hello', 5], expectedOutput: '     hello' },
];

describe('indentLine', () => {
  test('Returns the input string as is if no param is passed', () => {
    expect(indentLine('hello')).toBe('hello');
  });

  testCases.forEach(testCase => {
    test(`Returns the string ${testCase.input[0]} with an indentation of ${testCase.input[1]} spaces`, () => {
      expect(indentLine(...testCase.input)).toBe(testCase.expectedOutput);
    });
  })
});