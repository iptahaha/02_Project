import { changeCurrentDB, sortData } from '../../pages/Main/ts/selectsLogic';

jest.mock('./../../utils/ts/utils', () => ({
  __esModule: true,
  slice: jest.fn(),
  getInputValue: jest.fn(),
  setDisabledAttributeByID: jest.fn(),
  removeChild: jest.fn(),
  createRowCollection: jest.fn(),
  appendChild: jest.fn(),
  addClass: jest.fn(),
  setInputValue: jest.fn(),
}));
jest.mock('./../../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));

jest.mock('./../../pages/Main/ts/getPersonDataLogic', () => ({
  __esModule: true,
  getData: jest.fn(() => true),
}));

const mainState = {
  currentDB: '/mysql',
  currentData: null,
  currentSortedData: null,
  currentSelectedNode: null,
  currentSelectedId: null,
  currentSelectedObj: null,
};

describe('sort data', () => {
  test('should be defined', () => {
    expect(sortData).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof sortData).toBe('function');
  });
  test('should be function sort data', () => {
    expect(sortData(mainState)).toBeUndefined();
  });
  test('should be function sort data', () => {
    mainState.currentSortedData = [null];
    expect(sortData(mainState)).toBeUndefined();
  });
});

describe('change current DB', () => {
  test('should be defined', () => {
    expect(changeCurrentDB).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof changeCurrentDB).toBe('function');
  });
  test('should be function change current DB', () => {
    expect(changeCurrentDB(mainState)).toBeUndefined();
  });
});
