import {
  generateNewRowContent,
  updateObjInState,
  updatePerson,
  updatePersonRequest
} from "../../pages/Main/ts/updatePersonLogic";
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

jest.mock('./../../utils/ts/utils', () => {
  return {
    __esModule: true,
    collectData: jest.fn(() => [ [0, 'test'], [1,'test'], [2, 22], [3,'Kharkiv'], [4,'+3809999999999'],
      [5,'test@gmail.com'], [6,'my test']]),
    valueLength: jest.fn(() => 0)
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

describe('updatePerson', () => {
  const arr = [obj];
  test('updatePerson', () => {
    expect(updatePerson(arr)).toBeFalsy();
  })
  test('updatePerson', () => {
    expect(updatePerson(arr)).toBeTruthy();
  })
})

describe('generateNewRowContent', () => {
  test('generateNewRowContent', () => {
    expect(generateNewRowContent(1, obj))
      .toStrictEqual(`
          <td>1</td>
          <td>test</td>
          <td>test</td>
          <td>22</td>
          <td>Kharkiv</td>
          <td>+3809999999999</td>
          <td>test@gmail.com</td>
          <td>my test</td>`);
  })
})

describe('updateObjInState', () => {
  test('updateObjInState', () => {
    const arr = [obj]
    expect(updateObjInState(arr,1, obj)).toStrictEqual(arr);
  })
  test('updateObjInState', () => {
    const arr = [obj]
    expect(updateObjInState(arr,2, obj)).toStrictEqual(arr);
  })
})

describe('updatePersonRequest', () => {
  test('updatePersonRequest', () => {
    const arr = [obj];
    expect(updatePersonRequest(arr,1, obj)).toBeUndefined();
  })
})
