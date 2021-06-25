function simpleClass() {
  debugger;

  class AnimalES6a {
    constructor(name) {
      this.name = name;
    }

    doSomething() {
      console.log("I'm a " + this.name);
    }
  }

  debugger;
  var lionES6a = new AnimalES6a("Lion");
  lionES6a.doSomething();
}

function thisInClasses() {
  debugger;

  class Dog {
    constructor(name, breed) {
      this.name = name;
      this.breed = breed;
    }

    barkName() {
      console.log(`I am ${this.name}`);
    }
  }

  var giro = new Dog("Giro", "Spanish Sighthound");
  console.log(`Giro is a ${giro.breed}`);
}

function classWithGetSet() {
  debugger;

  class AnimalES6b {
    constructor(name) {
      this.name = name;
      this._age = 0;
    }

    get age() {
      return this._age;
    }

    set age(value) {
      if (value < 0) {
        console.log("We do not support undead animals");
      }

      this._age = value;
    }

    doSomething() {
      console.log("I'm a " + this.name);
    }
  }

  debugger;
  var lionES6 = new AnimalES6b("Lion");
  lionES6.doSomething();
  lionES6.age = 5;
  lionES6.age = -1;
}

function Inheritance() {
  debugger;

  class Person {
    constructor(name) {
      this._name = name;
    }

    get name() {
      return this._name;
    }

    set name(newValue) {
      if (newValue) {
        this._name = newValue;
      }
    }
  }

  class Employee extends Person {
    doWork() {
      return `${this._name} is working`;
    }
  }

  let p1 = new Person("Scott");
  p1.name = "Josef";
  let e1 = new Employee("Christopher");
  console.log(e1.doWork());
}

function overriding() {
  debugger;

  class Worker {
    constructor(name) {
      this.name = name;
    }

    get name() {
      return this._name;
    }

    set name(newValue) {
      if (newValue) {
        this._name = newValue;
      }
    }

    doWork() {
      return "free";
    }

    toString() {
      return this.name;
    }
  }

  class Teacher extends Worker {
    constructor(title, name) {
      super(name);
      this._title = title;
    }

    get title() {
      return this._title;
    }

    doWork() {
      return "paid";
    }
  }

  var t = new Teacher("Dr.", "Superclever");
  console.log(t.doWork());
}
