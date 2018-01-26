var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store res in variable
    var from = 'Bart';
    var text = 'Test text';
    var message = generateMessage(from, text);

    // assert from match
    expect(message.from).toBe(from);

    // assert text match
    expect(message.text).toBe(text);

    // or we can do it like this
    // expect(message).toInclude({from, text});

    // assert createdAt is a number
    expect(typeof message.createdAt).toBe('number');
  });
});
