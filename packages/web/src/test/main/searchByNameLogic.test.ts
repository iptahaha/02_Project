//import {filterByName} from "../../pages/Main/ts/searchByNameLogic";

jest.mock('./../../utils/ts/utils', () => {
  return {
    __esModule: true,
    slice: jest.fn( () => true),
    getInputValue: jest.fn(),
    trimToLowerCase: jest.fn(),
  }
})

// describe('filterByName', () => {
//   test('filterByName', () => {
//     const mainState = {
//       currentDB: '/mysql',
//       currentData: null,
//       currentSortedData: null,
//       currentSelectedNode: null,
//       currentSelectedId: null,
//       currentSelectedObj: null,
//     };
//     expect(filterByName(mainState)).toStrictEqual(mainState);
//   })
// })
