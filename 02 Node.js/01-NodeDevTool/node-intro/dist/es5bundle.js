"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function simpleClass() {
  debugger;

  var AnimalES6a =
  /*#__PURE__*/
  function () {
    function AnimalES6a(name) {
      _classCallCheck(this, AnimalES6a);

      this.name = name;
    }

    _createClass(AnimalES6a, [{
      key: "doSomething",
      value: function doSomething() {
        console.log("I'm a " + this.name);
      }
    }]);

    return AnimalES6a;
  }();

  debugger;
  var lionES6a = new AnimalES6a("Lion");
  lionES6a.doSomething();
}

function thisInClasses() {
  debugger;

  var Dog =
  /*#__PURE__*/
  function () {
    function Dog(name, breed) {
      _classCallCheck(this, Dog);

      this.name = name;
      this.breed = breed;
    }

    _createClass(Dog, [{
      key: "barkName",
      value: function barkName() {
        console.log("I am ".concat(this.name));
      }
    }]);

    return Dog;
  }();

  var giro = new Dog("Giro", "Spanish Sighthound");
  console.log("Giro is a ".concat(giro.breed));
}

function classWithGetSet() {
  debugger;

  var AnimalES6b =
  /*#__PURE__*/
  function () {
    function AnimalES6b(name) {
      _classCallCheck(this, AnimalES6b);

      this.name = name;
      this._age = 0;
    }

    _createClass(AnimalES6b, [{
      key: "doSomething",
      value: function doSomething() {
        console.log("I'm a " + this.name);
      }
    }, {
      key: "age",
      get: function get() {
        return this._age;
      },
      set: function set(value) {
        if (value < 0) {
          console.log("We do not support undead animals");
        }

        this._age = value;
      }
    }]);

    return AnimalES6b;
  }();

  debugger;
  var lionES6 = new AnimalES6b("Lion");
  lionES6.doSomething();
  lionES6.age = 5;
  lionES6.age = -1;
}

function Inheritance() {
  debugger;

  var Person =
  /*#__PURE__*/
  function () {
    function Person(name) {
      _classCallCheck(this, Person);

      this._name = name;
    }

    _createClass(Person, [{
      key: "name",
      get: function get() {
        return this._name;
      },
      set: function set(newValue) {
        if (newValue) {
          this._name = newValue;
        }
      }
    }]);

    return Person;
  }();

  var Employee =
  /*#__PURE__*/
  function (_Person) {
    _inherits(Employee, _Person);

    function Employee() {
      _classCallCheck(this, Employee);

      return _possibleConstructorReturn(this, _getPrototypeOf(Employee).apply(this, arguments));
    }

    _createClass(Employee, [{
      key: "doWork",
      value: function doWork() {
        return "".concat(this._name, " is working");
      }
    }]);

    return Employee;
  }(Person);

  var p1 = new Person("Scott");
  p1.name = "Josef";
  var e1 = new Employee("Christopher");
  console.log(e1.doWork());
}

function overriding() {
  debugger;

  var Worker =
  /*#__PURE__*/
  function () {
    function Worker(name) {
      _classCallCheck(this, Worker);

      this.name = name;
    }

    _createClass(Worker, [{
      key: "doWork",
      value: function doWork() {
        return "free";
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.name;
      }
    }, {
      key: "name",
      get: function get() {
        return this._name;
      },
      set: function set(newValue) {
        if (newValue) {
          this._name = newValue;
        }
      }
    }]);

    return Worker;
  }();

  var Teacher =
  /*#__PURE__*/
  function (_Worker) {
    _inherits(Teacher, _Worker);

    function Teacher(title, name) {
      var _this;

      _classCallCheck(this, Teacher);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Teacher).call(this, name));
      _this._title = title;
      return _this;
    }

    _createClass(Teacher, [{
      key: "doWork",
      value: function doWork() {
        return "paid";
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      }
    }]);

    return Teacher;
  }(Worker);

  var t = new Teacher("Dr.", "Superclever");
  console.log(t.doWork());
}
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function stringFunctions() {
  debugger; //Template Literals

  var productID = 100;
  var category = "music";
  var url = "http://server/" + category + "/" + productID; //old way

  console.log(url);
  var tl = "http://server/".concat(category, "/").concat(productID); //template literal

  console.log(tl); //startswith

  var str = "To be, or not to be, that is the question.";
  console.log(str.startsWith("To be")); // true

  console.log(str.endsWith("question.")); // true

  function countString(ts) {
    var characters = ["a", "b", "c"];
    var ct = 0;

    for (var i = 0; i < ts.length; i++) {
      if (characters.includes(ts[i])) {
        ct++;
      }
    }

    return ct;
  }

  console.log("chars included in your string: ".concat(countString("abheben")));
}

function shortHandProperties() {
  debugger;

  function createMonsterES5(name, power) {
    return {
      type: "Monster",
      name: name,
      power: power
    };
  }

  function createWitchES5(name) {
    return {
      type: "Witch",
      name: name
    };
  }

  var monster = createMonsterES5("Hulk", "strong");
  console.log(monster);

  function createMonster(name, power) {
    return {
      type: "Monster",
      name: name,
      power: power
    };
  }

  function createWitch(name) {
    return {
      type: "Witch",
      name: name
    };
  }

  var witch = createWitch("Hexi");
  console.log(witch);
}

function letBasics() {
  debugger; //tuce is *not* visible out here
  //console.log(tuce);

  for (var tuce = 0; tuce < 5; tuce++) {
    //tuce is only visible in here (and in the for() parentheses)
    console.log(tuce);
  }

  for (var _tuce = 0; _tuce < 5; _tuce++) {
    //tuce is only visible in here (and in the for() parentheses)
    console.log(_tuce);
  } //tuce is *not* visible out here

}

function constBasics() {
  debugger; //const pageSize; //produces ERROR: const declarations must be initialized
  //const is block scoped

  var nbr = 123;

  if (true) {
    var _nbr = 456; // Allowed as its a new variable limited to this `if` block
  } //can be used with object literals


  var person = {
    name: 123
  };
  person.bar = 456; // Allowed!

  console.log(person); // { name: 456 }

  person.name = "alex";
}

function defaultParam() {
  debugger;

  function multiply(a) {
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return a * b;
  }

  multiply(2);
}

function forOf() {
  debugger;
  var someArray = ["a", "b", "c"];

  for (var item in someArray) {
    console.log(item); // 0,1,2 ... Returns the key ... the index
  }

  for (var _i = 0, _someArray = someArray; _i < _someArray.length; _i++) {
    var item = _someArray[_i];
    console.log(item); // a, b, c
  }
}

function arrayHelpers() {
  debugger;
  var fruits = [{
    name: "apples",
    quantity: 2,
    price: 3,
    region: "europe"
  }, {
    name: "bananas",
    quantity: 0,
    price: 5,
    region: "caribean"
  }, {
    name: "cherries",
    quantity: 5,
    price: 8,
    region: "europe"
  }]; //remember ECMA Script 5 pattern

  var result = [];

  for (var i = 0; i < fruits.length; i++) {
    var item = fruits[i];

    if (item.quantity < 6) {
      result.push(item);
    }
  }

  console.log("There areas ".concat(result.length, " items in the Array")); //forEach

  fruits.forEach(function (fruit) {
    fruit.quantity++;
  }); //find

  var cherry = fruits.find(function (fruit) {
    return fruit.name === "cherries";
  });
  console.log(cherry); //filter

  var cheap = fruits.filter(function (item) {
    return item.price < 6;
  });
  console.log(cheap); //every - some

  var allEuropean = fruits.every(function (fruit) {
    return fruit.region = "Europe";
  });
  console.log(allEuropean);
  var anyEuropean = fruits.some(function (fruit) {
    return fruit.region = "Europe";
  });
  console.log(anyEuropean); //reduce

  var fruitNames = fruits.reduce(function (prevArray, fruit) {
    prevArray.push(fruit.name);
    return prevArray;
  }, []);
  console.log(fruitNames); //splice

  var dogs = ["whippet", "galgo espanol", "magyar whistler", "magyar agar"];
  dogs.splice(2, 0, "chart polski");
  console.log(dogs);
  dogs.splice(3, 1);
  console.log(dogs);
} //-> C# Dictionary


function maps() {
  debugger;
  var myMap = new Map();

  var keyString = "a string",
      keyObj = {},
      keyFunc = function keyFunc() {
    console.log("function in map array");
  }; // setting the values


  myMap.set(keyString, "value associated with 'a string'");
  myMap.set(keyObj, "value associated with keyObj");
  myMap.set(keyFunc(), "value associated with keyFunc");
  console.log("Map size: " + myMap.size); // 3
  // getting the values

  myMap.get(keyString); // "value associated with 'a string'"

  myMap.get("a string"); // "value associated with 'a string'" because keyString === 'a string'

  myMap.get(keyObj); // "value associated with keyObj"
} //-> Indexed Array


function sets() {
  debugger;
  var mySet = new Set();
  mySet.add(1);
  mySet.add("some text");
  var o = {
    a: 1,
    b: 2
  };
  mySet.add(o);
  mySet.has(1); // true

  mySet.has(3); // false, 3 has not been added to the set

  mySet.has(Math.sqrt(25)); // true

  mySet.has("Some Text".toLowerCase()); // true

  mySet.has(o); // true

  var size = mySet.size; // 4

  mySet["delete"](5); // removes 5 fro
}

function restParams() {
  debugger;
  var store = new Array();
  store.rows = new Map();

  store.add = function (category) {
    var row = store.rows[category];

    if (row == undefined) {
      store.rows.set(category, new Array());
    }

    for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      items[_key - 1] = arguments[_key];
    }

    items.forEach(function (item) {
      store.rows.get(category).push(item);
    });
  };

  store.add("fruit", "apple");
  store.add("dairy", "milk", "cheese", "yoghurt");
  store.add("pastries", "donuts", "croissants");
  store.add("cleaning", "soap", "body lotion", "shampoo", "tooth brush");
}

function objAssign() {
  debugger;
  var obj = {
    name: "alex",
    birth: new Date()
  };
  var copy = Object.assign({}, obj, {
    birth: moment("19700402", "YYYYMMDD").format("MMM Do YY")
  });
  console.log(copy); // { a: 1 }
}

function arrowFunctions() {
  debugger;

  var add = function add(x, y) {
    var temp = x + y;
    return temp;
  };

  var square = function square(x) {
    return x * x;
  };

  console.log(add(4, 9));
  console.log(square(6));
}

function introDestructuring() {
  debugger;
  var rect = {
    x: 0,
    y: 10,
    width: 15,
    height: 20
  }; // Destructuring assignment

  var x = rect.x,
      y = rect.y,
      width = rect.width,
      height = rect.height;
  console.log(x, y, width, height); // 0,10,15,20
  // Array Destructuring

  var a = 1,
      b = 2;
  var _ref = [b, a];
  a = _ref[0];
  b = _ref[1];
  console.log(x, y); // 2,1
}

function generatorFunction() {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(getColors);

  debugger;

  function getColors() {
    return regeneratorRuntime.wrap(function getColors$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return "green";

          case 2:
            _context.next = 4;
            return "red";

          case 4:
            _context.next = 6;
            return "blue";

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  var colorGenerator = getColors();
  debugger;
  console.log(colorGenerator.next());
  console.log(colorGenerator.next());
  console.log(colorGenerator.next()); //practical usage many time together with for ... of

  var arrColor = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = getColors()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var col = _step.value;
      arrColor.push(col);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  console.log(arrColor);
}

function enhancedObjectLiterals() {
  debugger; //Property value shorthand

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
      make: make,
      model: model,
      value: value
    };
  } //Method definition shorthand


  function getBusES5(make, model, value) {
    return {
      depreciate: function depreciate() {
        this.value -= 2500;
      }
    };
  }

  function getBus(make, model, value) {
    return {
      // Method definition shorthand syntax
      // omits `function` keyword & colon
      depreciate: function depreciate() {
        this.value -= 2500;
      }
    };
  }
}

function destructuring() {
  debugger; // object pattern matching

  var _fName$age$lName = {
    fName: "John",
    age: 15,
    lName: "Doe"
  },
      lName = _fName$age$lName.lName,
      fName = _fName$age$lName.fName; // array pattern matching

  var _ref2 = [8, 4, 100, -5, 20],
      first = _ref2[0],
      second = _ref2[1],
      third = _ref2[2]; // output: Doe, John

  console.log(lName + ", " + fName); // output: 100, 4, 8

  console.log(third, second, first);
  var myArray = [1, ["hello"], true],
      a = myArray[0],
      b = myArray[1],
      c = myArray[2]; // output: 1, ['hello'], true

  console.log(a, b, captureEvents());
}

function promisesES6() {
  debugger;

  function doAsyncTask() {
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("Async Work Complete");
        resolve("Promise resolvedd");
      }, 1000);
    });
    return promise;
  }

  doAsyncTask().then(function (msg) {
    console.log(msg);
    console.log("Async Task complete");
  });
}

function asyncAwait() {
  debugger;

  function doubleAfter2Seconds(x) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(x * 2);
      }, 2000);
    });
  }

  function doCalc(_x, _x2) {
    return _doCalc.apply(this, arguments);
  }

  function _doCalc() {
    _doCalc = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(nbrA, nbrB) {
      var a, b;
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              a = doubleAfter2Seconds(nbrA);
              b = doubleAfter2Seconds(nbrB);
              _context2.next = 4;
              return a;

            case 4:
              _context2.t0 = _context2.sent;
              _context2.next = 7;
              return b;

            case 7:
              _context2.t1 = _context2.sent;
              return _context2.abrupt("return", _context2.t0 + _context2.t1);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));
    return _doCalc.apply(this, arguments);
  }

  doCalc(10, 20).then(function (data) {
    console.log("result is ".concat(data));
  });
}

function usingFetch() {
  debugger; //helpful reference: https://davidwalsh.name/fetch
  //classic fetch - no config

  fetch("./demos/vouchers.json").then(function (resp) {
    console.log("Data received from fetch:");
    console.log(resp.json()); //Find Data in PromiseValue
  }); //fetch using config with custom header

  var url = "/api/vouchers";
  var data = {
    Text: "Inserted by WebApi",
    Date: new Date()
  };
  var headers = new Headers();
  headers.set("Content-Type", "application/json; charset=utf-8");
  var cfg = {
    method: "POST",
    headers: headers,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data)
  };
  fetch(url, cfg).then(function (resp) {
    console.log("Data received from fetch using config:");
    console.log(resp.json()); //Find Data in PromiseValue
  });
}
//# sourceMappingURL=es5bundle.js.map
