import { Calculator } from "./currency.functions";
import { MathFunctions } from "./math.functions";

export class ModulesDemos {
  useModule() {
    var sqr = MathFunctions.square(3);
    console.log("3 square is " + sqr);
    var calc = new Calculator();
    calc.add(1, 3);
  }
}
