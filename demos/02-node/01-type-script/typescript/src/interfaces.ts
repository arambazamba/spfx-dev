export class InterfacesDemos {
    interfacesBasics() {
        interface IHumanBeeing {
            name: string;
            birthDate: Date;
            walk: () => void;
        }

        class Knight implements IHumanBeeing {
            name: string;
            birthDate: Date;
            weapon: string = 'Battle Axe';
            walk: () => void;
        }

        let rob: Knight = new Knight();
        rob.name = 'Rob Stark';
        rob.walk = () => {
            console.log('I am walking');
        };
    }

    interfacesNullability() {
        interface IWorker {
            name: string;
            salary: number;
        }

        //does not implement interface - salary missing
        //class Accountant implements IWorker {
        //    name: string;
        //}

        interface IManager {
            name: string;
            salary?: number;
        }

        class DeliveryManager implements IManager {
            name: string;
        }
    }

    interfacesObjectLiterals() {
        interface ILongLat {
            Long: number;
            Lat: number;
        }
        var position: ILongLat = { Long: 17.123123, Lat: 12.123123 };
        console.log('We are at position Long: ' + position.Long + ' Lat: ' + position.Lat);
    }

    interfacesFunctions() {
        interface LabelledValue {
            label: string;
        }

        function printLabel(labelledObj: LabelledValue) {
            console.log(labelledObj.label);
        }

        let myObj = { size: 10, label: 'Size 10 Object' };
        printLabel(myObj);

        //Function Interfaces

        interface SearchFunc {
            (source: string, subString: string): boolean;
        }

        var searchDelegate: SearchFunc = function (source: string, subString: string) {
            return false;
        };
        searchDelegate = (source: string, subString: string) => false;
    }
}
