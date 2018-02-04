var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var lat = '13';
    var long = '11';
    var message = generateLocationMessage(from, lat, long);
    var url = 'https://www.google.com/maps?q13,11';

    expect(message.from).toBe(from);
    expect(typeof message.createdAt).toBe('number');
    expect(message.url).toBe(url);
  });
});
