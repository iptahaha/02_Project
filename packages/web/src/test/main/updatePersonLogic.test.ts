import { enableFetchMocks } from 'jest-fetch-mock';
import {
  generateNewRowContent,
  updateObjInState,
  updatePerson,
  updatePersonRequest,
} from '../../pages/Main/ts/updatePersonLogic';

enableFetchMocks();

jest.mock('./../../utils/ts/utils', () => ({
  __esModule: true,
  collectData: jest.fn(() => [
    [0, 'test'],
    [1, 'test'],
    [2, 22],
    [3, 'Kharkiv'],
    [4, '+3809999999999'],
    [5, 'test@gmail.com'],
    [6, 'my test'],
  ]),
  valueLength: jest
    .fn(() => 0)
    .mockImplementationOnce(() => 1)
    .mockImplementationOnce(() => 1)
    .mockImplementationOnce(() => 1)
    .mockImplementationOnce(() => 1)
    .mockImplementationOnce(() => 1)
    .mockImplementationOnce(() => 1),
  addMatch: jest.fn(),
  getElement: jest.fn(),
  addHTMLValue: jest.fn(),
  setDisabledAttributeByID: jest.fn(),
  removeDisabledAttributeByID: jest.fn(),
  setTextValue: jest.fn(),
  setDisplay: jest.fn(),
  getQuerySelectorAll: jest.fn(),
  cleanForm: jest.fn(),
  updatePersonResponse: jest.fn(),
  setHTMLValue: jest.fn(),
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

describe('update person', () => {
  const arr = [obj];
  test('should be function', () => {
    expect(updatePerson).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof updatePerson).toBe('function');
  });
  test('should be function update person === false', () => {
    expect(updatePerson(arr)).toBeFalsy();
  });
  test('should be function updatePerson === true', () => {
    expect(updatePerson(arr)).toBeTruthy();
  });
});

describe('generate new row content', () => {
  test('should be function', () => {
    expect(generateNewRowContent).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof generateNewRowContent).toBe('function');
  });
  test('should be function generate new row content', () => {
    expect(generateNewRowContent(1, obj)).toStrictEqual(`
          <td>1</td>
          <td>test</td>
          <td>test</td>
          <td>22</td>
          <td>Kharkiv</td>
          <td>+3809999999999</td>
          <td>test@gmail.com</td>
          <td>my test</td>`);
  });
});

describe('update obj in state', () => {
  test('should be function', () => {
    expect(updateObjInState).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof updateObjInState).toBe('function');
  });
  test('should be function update obj in state', () => {
    const arr = [obj];
    expect(updateObjInState(arr, 1, obj)).toStrictEqual(arr);
  });
  test('should be function update obj in state', () => {
    const arr = [obj];
    expect(updateObjInState(arr, 2, obj)).toStrictEqual(arr);
  });
});

describe('update person request', () => {
  test('should be function', () => {
    expect(updatePersonRequest).toBeDefined();
  });
  test('should be function typeof function', () => {
    expect(typeof updatePersonRequest).toBe('function');
  });
  test('should be function update person request', () => {
    const arr = [obj];
    expect(updatePersonRequest(arr, 1, obj)).toBeUndefined();
  });
});
