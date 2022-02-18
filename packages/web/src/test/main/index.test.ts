import {init} from './../../pages/Main/ts/index';
// import { enableFetchMocks } from 'jest-fetch-mock';
// enableFetchMocks();

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
    addNewPersonRequest: jest.fn(() => true),
    addNewPerson: jest.fn(),
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
    showOrHidePassword: jest.fn(() => true),
    addClass: jest.fn(),
    validateStatusCheck: jest.fn(),
    // collectData: jest.fn(),
    // getElement: jest.fn(),
    // setHTMLValue: jest.fn(),
    // valueLength: jest.fn(),
    // addHTMLValue: jest.fn(),
    // setDisabledAttributeByID: jest.fn(),
  }
})

jest.mock('./../../utils/ts/localization', () => {
  return {
    __esModule: true,
    checkLocalStorageLangValue: jest.fn(),
  }
})

describe('init', () => {
  test('init', () => {
    expect(init()).toBeUndefined();
  })
})
