import { getClick, selectRow } from '../../pages/Main/ts/selectPersonLogic';

const obj = { id: 1 };
const mainState = {
  currentDB: '/mysql',
  currentData: [{ id: 1 }, { id: 2 }],
  currentSortedData: null,
  currentSelectedNode: obj,
  currentSelectedId: null,
  currentSelectedObj: null,
};

jest.mock('./../../utils/ts/utils', () => ({
  __esModule: true,
  targetValueClosest: jest.fn(() => obj),
  removeDisabledAttributeByID: jest.fn(),
  addId: jest.fn(() => 1),
  removeClass: jest.fn(() => 1),
  addElementClass: jest.fn(),
  setDisabledAttributeByID: jest.fn(),
}));
jest.mock('./../../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));

const { targetValueClosest } = require('../../utils/ts/utils');

describe('select row test', () => {
  test('select row', () => {
    expect(selectRow(event, mainState)).toBe(1);
  });
  test('select row', () => {
    targetValueClosest.mockImplementationOnce(() => 1);
    expect(selectRow(event, mainState)).toBe(1);
  });
});

describe('get click', () => {
  test('get click', () => {
    expect(getClick(mainState)).toStrictEqual(mainState);
  });
});
