//import {init} from './../../pages/Main/ts/index';

jest.mock('./../../pages/Main/ts/clearAllLogic', () => {
  return {
    __esModule: true,
    clearAll: jest.fn(() => true)
  }
})
jest.mock('./../../pages/Main/ts/deletePersonLogic', () => {
  return {
    __esModule: true,
    deleteRow: jest.fn(() => true)
  }
})
jest.mock('./../../pages/Main/ts/createPersonLogic', () => {
  return {
    __esModule: true,
    addNewPersonRequest: jest.fn(() => true)
  }
})
jest.mock('./../../pages/Main/ts/getPersonDataLogic', () => {
  return {
    __esModule: true,
    getData: jest.fn(() => true)
  }
})
jest.mock('./../../utils/ts/utils', () => {
  return {
    __esModule: true,
    addListener: jest.fn(),
    checkLocalStorageThemeValue: jest.fn(() => true),
    showOrHidePassword: jest.fn(() => true)
  }
})

// describe('init', () => {
//   test('init', () => {
//     expect(init()).toBeUndefined();
//   })
// })
