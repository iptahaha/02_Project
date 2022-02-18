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
  getInputValue: jest
    .fn(() => '1')
    .mockImplementationOnce(() => '')
    .mockImplementationOnce(() => '2')
    .mockImplementationOnce(() => '3')
    .mockImplementationOnce(() => '4')
    .mockImplementationOnce(() => '5')
    .mockImplementationOnce(() => '6')
    .mockImplementationOnce(() => '')
    .mockImplementationOnce(() => '')
    .mockImplementationOnce(() => '9')
    .mockImplementationOnce(() => '10')
    .mockImplementationOnce(() => '11'),
  setAttribute: jest.fn(),
  valueLength: jest
    .fn(() => 15)
    .mockImplementationOnce(() => 3)
    .mockImplementationOnce(() => 15)
    .mockImplementationOnce(() => 21)
    .mockImplementationOnce(() => 15)
    .mockImplementationOnce(() => 15)
    .mockImplementationOnce(() => 15)
    .mockImplementationOnce(() => 15)
    .mockImplementationOnce(() => 15)
    .mockImplementationOnce(() => 7),
  getMatch: jest
    .fn(() => 'test')
    .mockImplementationOnce(() => '')
    .mockImplementationOnce(() => '1')
    .mockImplementationOnce(() => ''),
  removeAttribute: jest.fn(),
  setTextValue: jest.fn(),
}));

describe('login validate', () => {
  test('should be function', () => {
    expect(loginValidate).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof loginValidate).toBe('function');
  });
  test('should be function login validate === false', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('should be function login validate === false', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('should be function login validate === false', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('should be function login validate === false', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('should be function login validate === true', () => {
    expect(loginValidate([false], 0, 'text', 'text')).toBeTruthy();
  });
});

describe('password validate', () => {
  test('should be function', () => {
    expect(passwordValidate).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof passwordValidate).toBe('function');
  });
  test('should be function password validate === false', () => {
    expect(passwordValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('should be function password validate === false', () => {
    expect(passwordValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('should be function password validate === false', () => {
    expect(passwordValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
  test('should be function password validate === false', () => {
    expect(passwordValidate([false], 0, 'text', 'text')).toBeFalsy();
  });
});

describe('confirm password validate', () => {
  test('should be function', () => {
    expect(passwordValidate).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof passwordValidate).toBe('function');
  });
  test('should be function confirm password validate === false', () => {
    expect(confirmPasswordValidate([false], 0, 'text', 'text', 'text')).toBeFalsy();
  });
  test('should be function confirm password validate === true', () => {
    expect(confirmPasswordValidate([false], 0, 'text', 'text', 'text')).toBeTruthy();
  });
  test('should be function confirm password validate === true', () => {
    expect(confirmPasswordValidate([false], 0, 'text', 'text', 'text')).toBeTruthy();
  });
  test('should be function confirm password validate === true', () => {
    expect(confirmPasswordValidate([false], 0, 'text', 'text', 'text')).toBeTruthy();
  });
  test('should be function confirm password validate === true', () => {
    expect(confirmPasswordValidate([false], 0, 'text', 'text', 'text')).toBeTruthy();
  });
});
