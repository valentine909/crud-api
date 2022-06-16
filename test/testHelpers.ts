import assert from 'assert';
import * as help from '../src/helper';

describe('Helper', function () {
  it('should return true', function () {
    assert.equal(help.isValidString('aaa'), true);
  });
});
