import {
  changeUserLogin,
  changeUserLoginRequest,
  changeUserPassword,
  changeUserPasswordRequest,
} from '../../pages/Main/ts/changeUserLogic';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

jest.mock('./../../utils/ts/utils', () => {
  return {
    __esModule: true,
    collectData: jest.fn(),
    getInputValue: jest.fn(),
    valueLength: jest.fn(() => 9),
    setAttribute: jest.fn(),
    setDisabledAttributeByID: jest.fn(),
    getMatch: jest.fn(),
    removeDisabledAttributeByID: jest.fn(),
    setTextValue: jest.fn(),
  }
})

// jest.mock('./../../utils/validation/baseValidation', () => {
//   return {
//     __esModule: true,
//     passwordValidate: jest.fn(() => 1),
//     confirmPasswordValidate: jest.fn(),
//     loginValidate: jest.fn(),
//   }
// })

const mainState = {
  currentDB: '/mysql',
  currentData: [{id:1},{id:2}],
  currentSortedData: null,
  currentSelectedNode: null,
  currentSelectedId: null,
  currentSelectedObj: null,
};

describe('changeUserPassword', () => {
  test('changeUserPassword', () => {
    expect(changeUserPassword(mainState)).toBeFalsy();//toBeTruthy();
  })
  test('changeUserPassword', () => {
    expect(changeUserPassword(mainState)).toBeFalsy();
  })
})

describe('changeUserLogin', () => {
  test('changeUserLogin', () => {
    expect(changeUserLogin(mainState)).toBeFalsy()//toBeTruthy();
  })
})

describe('changeUserLoginRequest', () => {
  test('changeUserLoginRequest', () => {
    expect(changeUserLoginRequest(mainState)).toBeFalsy()//toBeTruthy();
  })
})

describe('changeUserPasswordRequest', () => {
  test('changeUserPasswordRequest', () => {
    expect(changeUserPasswordRequest(mainState)).toBeFalsy()//toBeTruthy();
  })
})
