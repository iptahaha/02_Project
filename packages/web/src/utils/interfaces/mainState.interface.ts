import {Person} from "./person.interface";

export interface MainState {
  currentDB: string,
  currentData: Person[] | null,
  currentSortedData: Person[] | null,
  currentSelectedNode: Node | null,
  currentSelectedId: string | number | null,
  currentSelectedObj: Person | null,
}
