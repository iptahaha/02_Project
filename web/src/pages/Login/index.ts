import "../../components/styles/styles.scss"
import '../../components/ts/utilts.ts'
import {addListener} from "../../components/ts/utilts";

console.log('login23423423423423')

addListener('test', 'click', () => {})

class Test{
  private test1: any;
  private test2: any;
  constructor(test1,test2) {
    this.test1 = test1;
    this.test2 = test2;
  }
}

console.log(Test)

