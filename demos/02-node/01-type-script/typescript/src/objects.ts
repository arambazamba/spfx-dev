import * as _ from 'lodash';

export class ObjectDemos {
    objectsBasics() {
        // Plain old JavaScript
        var myPerson = new Object();
        // myPerson.smile = function(){...}

        var otherPerson = <any>{};
        otherPerson.smile = function () {};

        let person: any = { Id: 1, Name: 'Giro' };
        person.walk = () => console.log(`I am ${person.Name} and I'm walking`);

        person.walk();
    }

    enhancedObjectLiterals() {
        //Property value shorthand
        function getCarES5(make, model, value) {
            return {
                make: make,
                model: model,
                value: value,
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
                value,
            };
        }

        function getPersonClone(person: any) {
            return { ...person };
        }

        let person: any = { Id: 1, Name: 'Martin' };
        var cloned = getPersonClone(person);

        //Method definition shorthand
        function getBusES5(value) {
            return {
                depreciate: function () {
                    this.value -= 2500;
                },
            };
        }

        function getBus(value) {
            return {
                // Method definition shorthand syntax
                // omits `function` keyword & colon
                depreciate() {
                    this.value -= 2500;
                },
            };
        }
    }

    destructuring() {
        let fullPerson = { firstName: 'John', name: 'Doe', age: 17 };
        let { firstName, name } = fullPerson;
        console.log(firstName + ', ' + name);
    }

    impFunction() {
        var name = 'Sandra';

        function greet(age: number) {
            name += `, how are you today? Your are ${age} years old`;
            console.log(name);
        }

        greet(14);

        name = 'Sabine';
        greet(14);
    }

    pureFunction() {
        function greet(age: number, name: string) {
            return `${name}, how are you today? Your are ${age} years old`;
        }

        console.log(greet(14, 'Sandra'));
        console.log(greet(24, 'Heinz'));
    }

    objAssign() {
        var giro = { name: 'Giro' };
        var result = Object.assign({}, giro, {
            birth: new Date(),
        });
        console.log('is this a copy or a clone?', result);
    }

    valref() {
        let person: any = { Id: 1, Name: 'Martin' };
        let myNumber: number = 100;

        function passArgs(nbr: number, pers: any) {
            nbr += 1;
            pers.Name = 'Giro';
        }

        passArgs(myNumber, person);
        console.log('result for myNumber & person:', myNumber, person);

        myNumber = 500;
        person.Name = 'Martin';
        passArgs(myNumber, Object.assign({}, person));
        console.log('result for myNumber & person using Object.assign():', myNumber, person);

        passArgs(myNumber, { ...person });
        console.log('result for myNumber & person using spread:', myNumber, person);
    }

    copyspread() {
        //Spred operator on arrays
        var [x, y, ...remaining] = [1, 2, 3, 4];
        console.log(x, y); // 1, 2,
        console.log(remaining);

        //Spread operator on objects
        var simplePerson = { name: 'Giro' };
        var dataPerson = {
            birth: new Date(),
            job: 'dev dude',
        };
        console.log({ ...dataPerson });

        var person = { ...simplePerson, ...dataPerson };
        console.log(person);
    }

    manualCloning() {
        let p = {
            name: 'Alexander ',
            dogs: [
                { dogname: 'Soi', breed: 'Whippet' },
                { dogname: 'Giro', breed: 'Galgo Espanol' },
            ],
        };

        function iterationCopy(src): { name: string; dogs: { dogname: string; breed: string }[] } {
            let target: any = {};
            for (let prop in src) {
                if (src.hasOwnProperty(prop)) {
                    target[prop] = src[prop];
                }
            }
            return target;
        }

        let copyPerson = iterationCopy(p);

        copyPerson.name = 'Martin';
        copyPerson.dogs[0].dogname = 'Soitscherl';

        console.log('Original', p);
        console.log('Copied', copyPerson);
    }

    lodashCloning() {
        let p = {
            name: 'Giro ',
            dogs: [
                {
                    dogname: 'Soi',
                    breed: 'Whippet',
                    dob: new Date(),
                    bark: () => console.log('barking'),
                },
                { dogname: 'Giro', breed: 'Galgo Espanol' },
            ],
        };

        let copyPerson = _.cloneDeep(p);

        copyPerson.name = 'Martin';
        copyPerson.dogs[0].dogname = 'Soitscherl';

        console.log('Original', p);
        console.log('Copied', copyPerson);
    }
}
