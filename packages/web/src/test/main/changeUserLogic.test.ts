import { enableFetchMocks } from 'jest-fetch-mock';
import { changeUserLogin, changeUserPassword } from '../../pages/Main/ts/changeUserLogic';

enableFetchMocks();

jest.mock('./../../utils/ts/utils', () => ({
  __esModule: true,
  collectData: jest.fn(),
  getInputValue: jest.fn(),
  valueLength: jest.fn(() => 9),
  setAttribute: jest.fn(),
  setDisabledAttributeByID: jest.fn(),
  getMatch: jest.fn(),
  removeDisabledAttributeByID: jest.fn(),
  setTextValue: jest.fn(),
  changeUserPasswordRequest: jest.fn(),
  changeUserLoginRequest: jest.fn(),
}));

jest.mock('./../../utils/validation/baseValidation', () => ({
  __esModule: true,
  passwordValidate: jest
    .fn(() => true)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false)
    .mockImplementationOnce(() => false),
  confirmPasswordValidate: jest.fn(),
  loginValidate: jest.fn(),
}));
jest.mock('./../../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));

const mainState = {
  currentDB: '/mysql',
  currentData: [{ id: 1 }, { id: 2 }],
  currentSortedData: null,
  currentSelectedNode: null,
  currentSelectedId: null,
  currentSelectedObj: null,
};

describe('changeUserLogin', () => {
  test('changeUserLogin', () => {
    expect(changeUserLogin(mainState)).toBeTruthy();
  });
  test('changeUserLogin', () => {
    expect(changeUserLogin(mainState)).toBeFalsy();
  });
});

describe('changeUserPassword', () => {
  test('changeUserPassword', () => {
    expect(changeUserPassword(mainState)).toBeFalsy();
  });
  test('changeUserPassword', () => {
    expect(changeUserPassword(mainState)).toBeTruthy();
  });
});
