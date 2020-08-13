const addNewLines = require('./addNewLines');

const testCases = [
  { input: ['hello', 2], expectedOutput: 'hello\n\n' },
  { input: ['hello', 10], expectedOutput: 'hello\n\n\n\n\n\n\n\n\n\n' },
  { input: ['hello', 5], expectedOutput: 'hello\n\n\n\n\n' },
];

describe('addNewLines', () => {
  test('Returns the input string as is if no param is passed', () => {
    expect(addNewLines('hello')).toBe('hello');
  });

  testCases.forEach(testCase => {
    test(`Returns the string ${testCase.input[0]} with ${testCase.input[1]} new lines at the end`, () => {
      expect(addNewLines(...testCase.input)).toBe(testCase.expectedOutput);
    });
  })
});