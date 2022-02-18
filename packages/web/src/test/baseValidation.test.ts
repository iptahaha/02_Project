import { confirmPasswordValidate, loginValidate, passwordValidate } from '../utils/validation/baseValidation';

jest.mock('./../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));
jest.mock('./../utils/ts/utils', () => ({
  __esModule: true,
  addListener: jest.fn(),
  getInputValue: jest.fn(() => 'true').mockImplementationOnce(() => ''),
  setAttribute: jest.fn(),
  valueLength: jest
    .fn(() => 15)
    .mockImplementationOnce(() => 3)
    .mockImplementationOnce(() => 21),
  getMatch: jest.fn(),
  removeAttribute: jest.fn(),
  setTextValue: jest.fn(),
}));

describe('', () => {
  test('test', () => {
    expect(true).toBeTruthy();
  });
  test('loginValidate', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('loginValidate', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('loginValidate', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('loginValidate', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('loginValidate', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('loginValidate', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
});

describe('passwordValidate', () => {
  test('passwordValidate', () => {
    expect(passwordValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('passwordValidate', () => {
    expect(passwordValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
});
describe('confirmPasswordValidate', () => {
  test('confirmPasswordValidate', () => {
    expect(confirmPasswordValidate([false], 0, 'text', 'text', 'text')).toBeTruthy();
  });
  test('confirmPasswordValidate', () => {
    expect(confirmPasswordValidate([false], 0, 'text', 'text', 'text')).toBeTruthy();
  });
});
