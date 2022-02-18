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

describe('filterByName', () => {
  test('should be defined', () => {
    expect(sortData).toBeDefined();
  });
  test('should be function', () => {
    expect(typeof sortData).toBe('function');
  });
  test('sort data', () => {
    expect(sortData(mainState)).toBeUndefined();
  });
  test('filterByName', () => {
    mainState.currentSortedData = [null];
    expect(sortData(mainState)).toBeUndefined();
  });
});

describe('changeCurrentDB', () => {
  test('changeCurrentDB', () => {
    expect(changeCurrentDB(mainState)).toBeUndefined();
  });
});
