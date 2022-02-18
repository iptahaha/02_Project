import {cleanForm, closedModal, fillUpdateModal, openModal} from "../../pages/Main/ts/modal";

jest.mock('./../../utils/ts/utils', () => {
  return {
    __esModule: true,
    setDisplay: jest.fn,
    setInputValue: jest.fn(),
    getQuerySelectorAll: jest.fn(() => [{id: 1, value: 'test'}]),
    setTextValue: jest.fn(),
  }
})

const obj = {
  id: 1,
  fname: 'test',
  lname: 'test',
  age: 22,
  city: 'Kharkiv',
  phoneNumber: '+3809999999999',
  email: 'test@gmail.com',
  companyName: 'my test'
};
const mainState = {
  currentDB: '/mysql',
  currentData: [{id:1},{id:2}],
  currentSortedData: null,
  currentSelectedNode: null,
  currentSelectedId: null,
  currentSelectedObj: obj,
};

describe('openModal', () => {
  test('openModal', () => {
    expect(openModal('string')).toBeTruthy();
  })
})

describe('fillUpdateModal', () => {
  test('fillUpdateModal', () => {
    expect(fillUpdateModal(mainState)).toBeTruthy();
  })
})

describe('cleanForm', () => {
  test('cleanForm', () => {
    expect(cleanForm()).toBeUndefined();
  })
})
//
describe('closedModal', () => {
  test('closedModal', () => {
    expect(closedModal('string')).toBeUndefined();
  })
})
