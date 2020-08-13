const kebabCase = require('./kebabCase');

const testCases = [
  { input: 'helloWorld', expectedOutput: 'hello-world' },
  { input: 'moreWordsLotsOfThem', expectedOutput: 'more-words-lots-of-them' },
  { input: 'anumberlike2shouldnotdelimit', expectedOutput: 'anumberlike2shouldnotdelimit' },
  { input: 'anumberlike2plus-dash', expectedOutput: 'anumberlike2plus-dash' },
  { input: '2HelloWorld', expectedOutput: '2hello-world' },
  { input: 'ALLCAPS', expectedOutput: 'allcaps' },
  { input: 'ALLCAPSmixedWithKebab', expectedOutput: 'allcapsmixed-with-kebab' },
];

describe('kebabCase', () => {
  testCases.forEach(testCase => {
    test(`function converts ${testCase.input} to ${testCase.expectedOutput}`, () => {
      expect(kebabCase(testCase.input)).toBe(testCase.expectedOutput);
    })
  });
});