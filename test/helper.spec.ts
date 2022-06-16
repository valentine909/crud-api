import 'jest';
import * as help from '../src/helper';

describe('Helper functions', () => {
  it('parseId should return uuid', () => {
    expect(help.parseId('localhost:5000/api/users/e45e6b20-24e2-4177-b278-adab56e7aa28')).toBe('e45e6b20-24e2-4177-b278-adab56e7aa28');
  });

  it('isValidString should return true', () => {
    expect(help.isValidString('aaa')).toBe(true);
  });

  it('isValidAge should return true', () => {
    expect(help.isValidAge(123)).toBe(true);
  });

  it('isValidHobbies should return true', () => {
    expect(help.isValidHobbies(['aaa', 'null', ''])).toBe(true);
  });

  it('isValidId should return true', () => {
    expect(help.isValidId('e45e6b20-24e2-4177-b278-adab56e7aa28')).toBe(true);
  });

  it('isValidId should return false', () => {
    expect(help.isValidId('e45e6b20-24e2-4177-b278-adab56e7aa281')).toBe(false);
  });
});
