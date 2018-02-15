const expect = require('expect');

var {isRealString} = require('./validation');

// import isRealString
  // it should reject non-string values
  // should reject strings with only spaces
  // should allow string with non-white characters

  describe('TEST isRealString', () => {
    it('should reject non-string values', () => {
      var result = isRealString(2342342345);
      expect(result).toBe(false);
    });

    it('should reject strings with only spaces', () => {
      var result = isRealString('      ');
      expect(result).toBe(false);
    });

    it('should allow string with non-white characters', () => {
      var result = isRealString('sgfse3$^#$U%HERTJFGNBXDS');
      expect(result).toBe(true);
    });
  });
