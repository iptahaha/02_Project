import { initLogin } from '../pages/Login';
import { loginIn } from '../pages/Login/logic';

jest.mock('./../utils/ts/utils', () => ({
  __esModule: true,
  addListener: jest.fn(),
  checkLocalStorageThemeValue: jest.fn(() => true),
  showOrHidePassword: jest.fn(() => true),
  getInputValue: jest.fn(),
  valueLength: jest.fn(),
  getMatch: jest.fn(),
  setAttribute: jest.fn(),
  collectData: jest.fn(() => '1'),
  getFetchLogic: jest.fn(),
  validateStatusCheck: jest.fn(() => true).mockImplementationOnce(() => false),
}));
jest.mock('./../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));
jest.mock('./../utils/validation/baseValidation', () => ({
  __esModule: true,
  passwordValidate: jest.fn(() => true),
  confirmPasswordValidate: jest.fn(),
  loginValidate: jest.fn(() => true).mockImplementationOnce(() => false),
  showOrHidePassword: jest.fn(),
}));

describe('init login', () => {
  test('test', () => {
    expect(true).toBeTruthy();
  });
  test('should be defined', () => {
    expect(initLogin).toBeDefined();
  });
  test('should be function', () => {
    expect(typeof initLogin).toBe('function');
  });
  test('should be init', () => {
    expect(initLogin()).toBeUndefined();
  });
});

describe('init login', () => {
  const state = {
    url: '/auth/login',
    validateStatus: [false, false],
  };
  test('test', () => {
    expect(true).toBeTruthy();
  });
  test('should be defined', () => {
    expect(loginIn).toBeDefined();
  });
  test('should be function', () => {
    expect(typeof loginIn).toBe('function');
  });
  test('should be init login', () => {
    expect(loginIn(state)).toBeFalsy();
  });
  test('should be init login', () => {
    expect(loginIn(state)).toBeTruthy();
  });
});
