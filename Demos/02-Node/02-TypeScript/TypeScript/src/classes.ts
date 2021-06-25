export class ClassesDemos {
  basicClasses() {
    debugger;

    class Voucher {
      ID: number;
      Text: string;
      Amount: number;
      Date: Date;
      Total?: number;
    }

    let v: Voucher = new Voucher(); // v: {}
    v.ID = 0;
    v.Text = "Demo Voucher";

    console.log("vouchertext is:" + v["Text"]);

    var vouchers = new Array<Voucher>();
    var voucherA: Voucher = {
      ID: 1,
      Text: "Media Markt",
      Amount: 22,
      Date: new Date()
    };
    vouchers.push(voucherA);
    var voucherB: Voucher = {
      ID: 2,
      Text: "Amazon",
      Amount: 44,
      Date: new Date()
    };
    vouchers.push(voucherB);

    for (var i = 0; i < vouchers.length; i++) {
      let v = vouchers[i];
      console.log(v.Text);
    }

    for (let v in vouchers) {
      console.log(v);
    }

    //try changing: let v -> var v ... think why
    for (let v of vouchers) {
      console.log(v.Text);
    }
  }

  classesConstructor() {
    debugger;

    class Person {
      name: string; //public by default
      alive: boolean;

      constructor(Name: string, Alive: boolean) {
        this.name = Name;
        this.alive = Alive;
      }
    }

    let jim = new Person("Jim", true);
    console.log(jim.name + " is alive: " + jim.alive);

    class Dog {
      constructor(private name: string, public breed: string) {}
      barkName() {
        return "Wuff, my name is " + this.name + ", I am a " + this.breed;
      }
      sayName() {
        return "Wuff, my name is " + name; // Wuff, my name is
      }
    }

    let dog = new Dog("Soi", "Whippet");
    console.log(dog.barkName());
    console.log(dog.sayName());
    console.log(dog.breed);

    class Invoice {
      text: string;
      paid: boolean;

      constructor(Text: string = "", Paid: boolean = false) {
        this.text = Text;
        this.paid = Paid;
      }
    }

    var b1: Invoice = new Invoice("Car Purchase");
    var b2: Invoice = new Invoice("Rösti für Freundin", true);

    console.log("b1 with Text: " + b1.text + " was " + b1.paid);
    console.log("b2 with Text: " + b2.text + " was " + b2.paid);

    class Smurf {
      readonly name: string;

      constructor(name: string) {
        if (name.length < 1) {
          throw new Error("Empty name!");
        }

        this.name = name;
      }
    }

    var smurf = new Smurf("Daniel");
    //smurf.name = "Dan"; // Error! 'name' is read-only.
  }

  getSet() {
    debugger;

    class Citzien {
      private _fullName: string;

      get fullName(): string {
        return this._fullName;
      }

      set fullName(newName: string) {
        this._fullName = `Citizen ${newName}`;
        console.log("name changed to " + newName);
      }
    }

    let employee = new Citzien();
    employee.fullName = "Bob Smith";

    if (employee.fullName) {
      console.log(employee.fullName);
    }
  }

  inheritance() {
    debugger;

    class Dog {
      constructor(public name: string) {}

      move(meters: number) {
        console.log(this.name + " moved " + meters + "m. " + this.speed);
      }

      public speed: string = "with 40 km/h";
    }

    class Sighthound extends Dog {
      constructor(name: string) {
        super(name);
      } //super -> C# .base

      public speed: string = "with up to 110 km/h";

      //method override
      move(meters = 500) {
        console.log("Running ..." + meters + "m. " + this.speed);
        //If you want to call implementation of base class use:
        super.move(meters);
      }
    }

    //var d = new Dog()

    var dog = new Dog("Bello");
    dog.move(50);

    var hound = new Sighthound("Soi");
    hound.move();
    hound.move(1000);

    //Protected Properties

    class Person {
      protected name: string;
      constructor(name: string) {
        this.name = name;
      }
    }

    class Employee extends Person {
      constructor(name: string, public department: string) {
        super(name); //base c#
      }

      public introduceSelf() {
        return `Hello, my name is ${this.name} and I work in ${
          this.department
        } department.`;
      }
    }

    let howard = new Employee("Howard", "Sales");
    console.log(howard.introduceSelf());
    //console.log(howard.name); // error
  }

  staticProperties() {
    debugger;

    interface ICoordinate {
      x: number;
      y: number;
    }

    class Grid {
      constructor(public scale: number) {}

      static origin: ICoordinate = <ICoordinate>{ x: 0, y: 0, z: 0 };

      calculateDistanceFromOrigin(point: { x: number; y: number }) {
        var xDist = point.x - Grid.origin.x;
        var yDist = point.y - Grid.origin.y;

        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
      }
    }

    var grid = new Grid(3);
    var p: ICoordinate = { x: 10, y: 20 };
    var result = grid.calculateDistanceFromOrigin(p);

    console.log("Grid result: " + result);
  }

  casting() {
    class Voucher {
      ID: number;
      Text: string;
      Amount: number;
      Date: Date;
    }

    interface IAccount {
      Number: number;
      Name: string;
      Balance: number;
    }

    //Assertion
    var v = {
      ID: 1,
      Text: "Media Markt",
      Amount: 22,
      Date: new Date()
    } as Voucher;

    //Casting
    v = <Voucher>{ ID: 1, Text: "Media Markt", Amount: 22, Date: new Date() };

    let a: IAccount = <IAccount>{
      Number: 400,
      Name: "Kasse",
      Balance: 20,
      TimeBound: false
    }; //Needs cast because of TimeBound prop

    //Numbers
    var x = "32";
    var y = +x;

    //Date
    var dt: Date = new Date("2014-08-23T11:00:00Z");
    console.log(dt);

    //string
    var nbr = 22;
    var nbrSTring: string = String(nbr);
  }

  abstractClasses() {
    debugger; //Classes used see blow

    let department: Department; // ok to create a reference to an abstract type
    //department = new Department(); // error: cannot create an instance of an abstract class

    department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
    department.printName();
    //department.generateReports(); // error: method doesn't exist on declared abstract type
  }
}

abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}
