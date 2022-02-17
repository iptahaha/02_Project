import {initRegister} from './../pages/Login/index';

jest.mock('./../utils/ts/utils', () => {
  return {
    __esModule: true,
    addListener: jest.fn(),
    checkLocalStorageValue: jest.fn(() => true),
    showOrHidePassword: jest.fn(() => true)
  }
})

describe('init register', () => {
  test("test", () => {
    expect(true).toBeTruthy();
  })
  test('should be defined', () => {
    expect(initRegister).toBeDefined()
  })
  test('should be function', () => {
    expect(typeof initRegister).toBe("function")
  })
  test('should be init register', () => {
    expect(initRegister()).toBeTruthy();
  })
})
