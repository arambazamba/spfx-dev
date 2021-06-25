// import moment = require("moment");
import * as moment from "moment";
import {
  from,
  fromEvent,
  interval,
  Observable,
  Observer,
  Subscription,
  throwError,
  of
} from "rxjs";
import { catchError, finalize, map, take, tap, filter } from "rxjs/operators";
import { isArray } from "util";
import { Movie, Voucher } from "./model";
import { VoucherService } from "./services";

export class RxJSDemos {
  fName: string;
  url = "vouchers.json";
  numbers = [1, 5, 10, 18, 22];

  nbrObs: Observable<number>;
  result$: Observable<any>;

  nbrSubscription: Subscription;

  stop: boolean = false;

  constructor() {}

  errHandler = err => {
    console.log(err);
  };

  complete = () => console.log("complete");

  useNewObs() {
    this.result$ = new Observable(observer => {
      let idx = 0;

      let getNumber = () => {
        observer.next(this.numbers[idx++]);

        if (idx < this.numbers.length) {
          setTimeout(getNumber, 250);
        } else {
          observer.complete();
        }
      };

      getNumber();
    });

    this.result$.subscribe((
      data: number //onNext
    ) => console.log("current number: ", data));
    this.errHandler; //onErr
    this.complete; //onComplete
  }

  useObsFrom() {
    this.result$ = from(this.numbers);

    this.nbrSubscription = this.result$.subscribe(
      (data: number) => console.log("useObsFrom: ", data), //onNext
      this.errHandler, //onErr
      this.complete //onComplete
    );

    //Same as above using chaining
    // this.nbrSubscription = from(this.numbers).subscribe((data: number) =>
    //   console.log("useObsFrom: ", data)
    // );
  }

  useOf() {
    this.result$ = of(this.numbers);
    this.result$.subscribe(data => console.log(data));
  }

  wrapXMLHttpRequest(): Observable<any> {
    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          observer.next(data);
          observer.complete();
        } else {
          observer.error(xhr.statusText);
        }
      });

      xhr.open("GET", this.url);
      xhr.send();
    });
  }

  wrappingCallbacks() {
    this.fName = "wrappingCallbacks()";

    let load = this.wrapXMLHttpRequest().subscribe(data => {
      console.log("wrappingCallbacks:", data);
    });
  }

  mockPromise(succeed: boolean): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      setTimeout(() => {
        console.log("Async Task Complete");
        if (succeed) {
          resolve(this.numbers);
        } else {
          reject("Outcome: Promise rejected");
        }
      }, 1000);
    });
  }

  usePromiseToObs() {
    let url = "https://jsonplaceholder.typicode.com/todos";
    from($.ajax(url)).subscribe(data => console.log("data from jquery", data));
  }

  useOperator() {
    from([2, 5, 9, 12, 22])
      .pipe(
        filter(n => n > 6),
        map(n => n * 2)
      )
      .subscribe((data: number) => console.log("useOperator: ", data));
  }

  sub: Subscription = null;
  unsbscribe = () => (this.sub != null ? this.sub.unsubscribe() : null);
  setLabel = v => ({ ...v, Label: `${v.Text} costs € ${v.Amount}` });
  vs: VoucherService = new VoucherService();

  vouchers: Voucher[] = null;

  log = (msg: string, data: any) => {
    console.log(`executing ${msg}, 'data' is Array: ${isArray(data)}`, data);
    this.vouchers = isArray(data) ? data : [data];
  };

  useMap() {
    this.vs
      .getVouchersObs()
      .pipe(
        //Obs Operator map()
        map(vs => {
          //ES6 array.map()
          return vs.map(v => ({
            ...v,
            Label: `${v.Text} costs € ${v.Amount}`
          }));
        })
      )
      .subscribe(data => this.log("use map() - RxJS 5 pattern", data));
  }

  usePipeMapAndTap() {
    //RxJS 6 pattern
    // tap() is the RxJS replacement for do() to ensure ES compatibility
    this.vs
      .getVouchersObs()
      .pipe(
        tap(data => console.log("logged by tap(): ", data)),
        map(vs => vs.map(this.setLabel))
      )
      .subscribe(data => this.log("use pipe(), map() & tap()", data));
  }

  errHandling() {
    this.vs
      .getVouchersObs()
      .pipe(
        tap(data => console.log("logged by tap(): ", data)),
        map(vs => vs.map(this.setLabel)),
        catchError(err => {
          return throwError("Err happened while processing vouchers");
        }),
        finalize(() => console.log("finalizing ..."))
      )
      .subscribe(data => this.log("errHandling", data));
  }

  getByID() {
    this.vs
      .getVouchersObs()
      .pipe(map(v => v.find((v: Voucher) => v.ID == 3)))
      .subscribe(data => this.log("getByID - using find()", data));
  }

  useFilter() {
    this.vs
      .getVouchersObs()
      .pipe(map(v => v.filter((v: Voucher) => v.Paid)))
      .subscribe(data => this.log("useFilter", data));
  }

  //Compare the two outputs
  useTake() {
    this.vs
      .getVouchersObs()
      .pipe(take(3))
      .subscribe(data => this.log("useTake", data));

    interval(1000)
      .pipe(take(3))
      .subscribe(x => console.log(x));
  }

  mouseSubs: Subscription;

  useMouse() {
    let pad = document.querySelector(".signPad");
    let mouse = fromEvent(pad, "mousemove").pipe(
      map((evt: MouseEvent) => {
        return { X: evt.clientX, Y: evt.clientY };
      })
    );

    this.mouseSubs = mouse.subscribe(point => {
      console.log("Mouse Moved @: ", point);
    });
  }

  unsubscribeMouseEvt() {
    this.mouseSubs.unsubscribe();
    console.log("unsubscribed from Mouse Event");
  }
}
