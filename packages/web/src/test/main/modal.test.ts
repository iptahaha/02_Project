import { cleanForm, closedModal, fillUpdateModal, openModal } from '../../pages/Main/ts/modal';

jest.mock('./../../utils/ts/utils', () => ({
  __esModule: true,
  setDisplay: jest.fn,
  setInputValue: jest.fn(),
  getQuerySelectorAll: jest.fn(() => [{ id: 1, value: 'test' }]),
  setTextValue: jest.fn(),
}));
jest.mock('./../../utils/ts/localization', () => ({
  __esModule: true,
  checkLocalStorageLangValue: jest.fn(),
  updateContent: jest.fn(),
  changeLng: jest.fn(),
}));

const obj = {
  id: 1,
  fname: 'test',
  lname: 'test',
  age: 22,
  city: 'Kharkiv',
  phoneNumber: '+3809999999999',
  email: 'test@gmail.com',
  companyName: 'my test',
};
const mainState = {
  currentDB: '/mysql',
  currentData: [{ id: 1 }, { id: 2 }],
  currentSortedData: null,
  currentSelectedNode: null,
  currentSelectedId: null,
  currentSelectedObj: obj,
};

describe('open modal', () => {
  test('should be function', () => {
    expect(openModal).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof openModal).toBe('function');
  });
  test('should be function open modal', () => {
    expect(openModal('string')).toBeTruthy();
  });
});

describe('fill update modal', () => {
  test('should be function', () => {
    expect(fillUpdateModal).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof fillUpdateModal).toBe('function');
  });
  test('should be function fill update modal', () => {
    expect(fillUpdateModal(mainState)).toBeTruthy();
  });
});

describe('clean form', () => {
  test('should be function', () => {
    expect(cleanForm).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof cleanForm).toBe('function');
  });
  test('should be function clean form', () => {
    expect(cleanForm()).toBeUndefined();
  });
});

describe('closed modal', () => {
  test('should be function', () => {
    expect(closedModal).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof closedModal).toBe('function');
  });
  test('should be function closed modal', () => {
    expect(closedModal('string')).toBeUndefined();
  });
});
