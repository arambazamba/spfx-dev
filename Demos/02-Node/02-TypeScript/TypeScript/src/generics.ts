import { Voucher } from "./model";

export class GenericsDemos {
  genericFunctions() {
    debugger;

    function concat<T>(arg: Array<T>): string {
      let result = "";
      for (var m of arg) {
        result += m.toString() + ", ";
      }
      return result;
    }

    let stringArr: Array<string> = ["Alex", "Giro", "Soi the Whippet"];
    console.log(concat<string>(stringArr));

    let nbrArr: Array<number> = [100, 201, 322];
    console.log(concat<number>(nbrArr));
  }

  genericClassesInterfaces() {
    interface IInventory<T> {
      getNewestItem: () => T;
      addItem: (newItem: T) => void;
      getAllItems: () => Array<T>;
    }

    let voucherInventory: IInventory<Voucher>;

    class Catalog<T> implements IInventory<T> {
      private items = new Array<T>();

      addItem(newItem: T) {
        this.items.push(newItem);
      }

      getNewestItem(): T {
        return this.items[this.items.length - 1];
      }

      getAllItems(): T[] {
        return this.items;
      }
    }

    let cat = new Catalog<Voucher>();
    var v: Voucher = {
      ID: 1,
      Text: "Media Markt",
      Amount: 22,
      Date: new Date(),
      Paid: false,
      Expense: true
    };
    cat.addItem(v);
    console.log("Items in the catalog", cat.getAllItems);
  }

  genericConstraints() {
    interface ICatalogItem {
      catalogNumber: number;
    }

    interface IInventory<T> {
      getAllItems: () => Array<T>;
    }

    class Catalog<T extends ICatalogItem> implements IInventory<T> {
      private items = new Array<T>();
      getAllItems(): T[] {
        return this.items;
      }
    }
  }
}
