import { initRegister } from '../pages/Register';
import { sendRegister } from '../pages/Register/logic';

jest.mock('./../utils/ts/utils', () => ({
  __esModule: true,
  addListener: jest.fn(),
  checkLocalStorageThemeValue: jest.fn(() => true),
  showOrHidePassword: jest.fn(() => true),
  collectData: jest.fn(() => false).mockImplementationOnce(() => true),
  validateStatusCheck: jest.fn(() => true),
  addFetchUrlRegister: jest.fn(),
}));
jest.mock('./../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));
jest.mock('./../utils/validation/baseValidation', () => ({
  __esModule: true,
  passwordValidate: jest.fn(),
  confirmPasswordValidate: jest.fn(),
  loginValidate: jest.fn(() => true).mockImplementationOnce(() => false),
}));

describe('init register', () => {
  test('test', () => {
    expect(true).toBeTruthy();
  });
  test('should be defined', () => {
    expect(initRegister).toBeDefined();
  });
  test('should be function', () => {
    expect(typeof initRegister).toBe('function');
  });
  test('should be init', () => {
    expect(initRegister()).toBeUndefined();
  });
});

describe('init register', () => {
  const state = {
    urlRegister: '/auth/register',
  };
  test('should be defined', () => {
    expect(sendRegister).toBeDefined();
  });
  test('should be function', () => {
    expect(typeof sendRegister).toBe('function');
  });
  test('should be init register === false', () => {
    expect(sendRegister(state)).toBeFalsy();
  });
  test('should be init register === true', () => {
    expect(sendRegister(state)).toBeTruthy();
  });
});
