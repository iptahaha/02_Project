import { filterByName } from '../../pages/Main/ts/searchByNameLogic';

jest.mock('./../../utils/ts/utils', () => ({
  __esModule: true,
  slice: jest.fn(() => [1, 2]),
  getInputValue: jest.fn(() => ''),
  trimToLowerCase: jest.fn(() => 0),
  valueLength: jest.fn(() => 2).mockImplementationOnce(() => 0),
  removeChild: jest.fn(),
  createRowCollection: jest.fn(),
  appendChild: jest.fn(),
  includes: jest.fn(() => 1).mockImplementationOnce(() => 0),
}));
jest.mock('./../../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));

describe('filterByName', () => {
  const mainState = {
    currentDB: '/mysql',
    currentData: null,
    currentSortedData: null,
    currentSelectedNode: null,
    currentSelectedId: null,
    currentSelectedObj: null,
  };
  test('should be defined', () => {
    expect(filterByName).toBeDefined();
  });
  test('should be function', () => {
    expect(typeof filterByName).toBe('function');
  });
  test('filterByName', () => {
    expect(filterByName(mainState)).toStrictEqual(mainState);
  });
  test('filterByName', () => {
    expect(filterByName(mainState)).toStrictEqual(mainState);
  });
});
