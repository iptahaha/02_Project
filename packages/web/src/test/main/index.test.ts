import { init } from '../../pages/Main/ts/index';
// import { enableFetchMocks } from 'jest-fetch-mock';
// enableFetchMocks();

jest.mock('./../../pages/Main/ts/clearAllLogic', () => ({
  __esModule: true,
  clearAll: jest.fn(() => true),
}));
jest.mock('./../../pages/Main/ts/deletePersonLogic', () => ({
  __esModule: true,
  deleteRow: jest.fn(() => true),
}));
jest.mock('./../../pages/Main/ts/createPersonLogic', () => ({
  __esModule: true,
  addNewPersonRequest: jest.fn(() => true),
  addNewPerson: jest.fn(),
}));
jest.mock('./../../pages/Main/ts/getPersonDataLogic', () => ({
  __esModule: true,
  getData: jest.fn(() => true),
}));
jest.mock('./../../pages/Main/ts/logoutLogic', () => ({
  __esModule: true,
  logout: jest.fn(() => true),
}));
jest.mock('./../../utils/ts/utils', () => ({
  __esModule: true,
  addListener: jest.fn(),
  checkLocalStorageThemeValue: jest.fn(() => true),
  showOrHidePassword: jest.fn(() => true),
  addClass: jest.fn(),
  validateStatusCheck: jest.fn(),
  setInputValue: jest.fn(),
  // collectData: jest.fn(),
  // getElement: jest.fn(),
  // setHTMLValue: jest.fn(),
  // valueLength: jest.fn(),
  // addHTMLValue: jest.fn(),
  // setDisabledAttributeByID: jest.fn(),
}));

jest.mock('./../../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));
jest.mock('./../../utils/validation/baseValidation', () => ({
  __esModule: true,
  passwordValidate: jest.fn(() => true),
  confirmPasswordValidate: jest.fn(),
  loginValidate: jest.fn(),
}));

describe('init', () => {
  test('init', () => {
    expect(init()).toBeUndefined();
  });
});
