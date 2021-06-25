import * as moment from "moment";

export class ObjectDemos {
  objectsBasics() {
    debugger;

    // Plain old JavaScript
    var myPerson = new Object();
    // myPerson.smile = function(){...}

    var otherPerson = <any>{};
    otherPerson.smile = function() {};

    let person: any = { Id: 1, Name: "Alexander" };
    person.walk = () => console.log(`I am ${person.Name} and I'm walking`);

    person.walk();
  }

  enhancedObjectLiterals() {
    debugger;

    //Property value shorthand
    function getCarES5(make, model, value) {
      return {
        make: make,
        model: model,
        value: value
      };
    }

    function getCar(make, model, value) {
      return {
        // with property value shorthand
        // syntax, you can omit the property
        // value if key matches variable
        // name
        make,
        model,
        value
      };
    }

    function getPersonClone(person: any) {
      return { ...person };
    }

    let person: any = { Id: 1, Name: "Alexander" };
    var cloned = getPersonClone(person);

    //Method definition shorthand
    function getBusES5(value) {
      return {
        depreciate: function() {
          this.value -= 2500;
        }
      };
    }

    function getBus(value) {
      return {
        // Method definition shorthand syntax
        // omits `function` keyword & colon
        depreciate() {
          this.value -= 2500;
        }
      };
    }
  }

  destructuring() {
    debugger;

    // object pattern matching
    let { lName, fName } = { fName: "John", lName: "Doe" };
    //let { Name, FirstName } = { fName: "John", lName: "Doe" };

    // output: Doe, John
    console.log(lName + ", " + fName);

    var rect = { x: 0, y: 10, width: 15, height: 20 };

    // Destructuring assignment
    var { x, y, width, height } = rect;
    console.log(x, y, width, height); // 0,10,15,20

    // Destructuring using REST Param
    var { w, x, ...remaining } = { w: 1, x: 2, y: 3, z: 4 };
    console.log(w, x, remaining); // 1, 2, {y:3,z:4}
  }

  objAssign() {
    debugger;

    var obj = { name: "alex" };
    var copy = Object.assign({}, obj, {
      birth: moment("19700402", "YYYYMMDD").format("MMM Do YY")
    });
    console.log(copy);
  }

  valref() {
    debugger;

    let person: any = { Id: 1, Name: "Alexander" };
    let myNumber: number = 100;

    function passArgs(nbr: number, pers: any) {
      nbr += 1;
      pers.Name = "Alex";
    }

    passArgs(myNumber, person);
    console.log("result for myNumber & person:", myNumber, person);

    myNumber = 500;
    person.Name = "Alexander";
    passArgs(myNumber, Object.assign({}, person));
    console.log(
      "result for myNumber & person using Object.assign():",
      myNumber,
      person
    );

    passArgs(myNumber, { ...person });
    console.log("result for myNumber & person using spread:", myNumber, person);
  }

  copyspread() {
    debugger;

    //Spred operator on arrays
    var [x, y, ...remaining] = [1, 2, 3, 4];
    console.log(x, y); // 1, 2,
    console.log(remaining);

    //Spread operator on objects
    var simplePerson = { name: "alex" };
    var dataPerson = {
      birth: moment("19700402", "YYYYMMDD").format("MMM Do YY"),
      job: "dev dude"
    };
    console.log({ ...dataPerson });

    var person = { ...simplePerson, ...dataPerson };
    console.log(person);
  }
}
