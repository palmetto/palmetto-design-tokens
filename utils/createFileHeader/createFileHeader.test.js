const createFileHeader = require('./createFileHeader');

describe('createFileHeader', () => {
  test('Function generates a file header with the correct date', () => {
    const mockDate = new Date(1466424490000);
    const defaultFileHeader = `/**\n * Do not edit directly\n * Generated on ${mockDate.toUTCString()}\n */\n\n`;

    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate);

    const fileHeader = createFileHeader();

    expect(fileHeader).toBe(defaultFileHeader);
  });

  test('Function generates a file header // style comments if param is passed', () => {
    const mockDate = new Date(1466424490000);
    const defaultFileHeader = `\n// Do not edit directly\n// Generated on ${mockDate.toUTCString()}\n\n`;

    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate);

    const fileHeader = createFileHeader('short');

    expect(fileHeader).toBe(defaultFileHeader);
  }); 
});