import {changeUserLogin} from "../../pages/Main/ts/changeUserLogic";


jest.mock('./../../utils/ts/utils', () => {
  return {
    __esModule: true,
    // setDisplay: jest.fn,
    // setInputValue: jest.fn(),
    // getQuerySelectorAll: jest.fn(() => [{id: 1, value: 'test'}]),
    // setTextValue: jest.fn(),
    getInputValue: jest.fn(),
    valueLength: jest.fn(),
    getMatch: jest.fn(),
    setAttribute: jest.fn(),
  }
})

const mainState = {
  currentDB: '/mysql',
  currentData: [{id:1},{id:2}],
  currentSortedData: null,
  currentSelectedNode: null,
  currentSelectedId: null,
  currentSelectedObj: null,
};

describe('changeUserLogin', () => {
  test('changeUserLogin', () => {
    expect(changeUserLogin(mainState)).toBeFalsy();
  })
})
