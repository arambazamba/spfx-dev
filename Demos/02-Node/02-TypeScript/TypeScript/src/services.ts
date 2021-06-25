import { Voucher } from "./model";
import { GenericService } from "./generic.service";
import * as $ from "jquery";
import { Observable, from } from "rxjs";

export class ServicesDemos {
  url = "vouchers.json";

  usingjQueryAjax() {
    debugger;

    //callback based
    $.ajax({
      type: "GET",
      url: this.url,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      //classic callback pattern
      success: function success(data: any) {
        console.log("Data received from jQuery: ", data);
      },
      //shortcut of callback pattern - function removed
      error(err: any) {
        console.log("Error received from jQuery: ", err);
      }
    });
  }

  usingjQueryWithPromise() {
    debugger;

    //promise based
    $.ajax({
      type: "GET",
      url: this.url,
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .then(data => console.log("Data received from jQuery: ", data))
      .catch(err => console.log("Error received from jQuery: ", err));
  }

  logPipe = (msg: string, data: any) => {
    console.log(`logPipe() - ${msg}:`, data);
  };

  usingPromises() {
    debugger;

    //Mocking a promise function
    function getMockPromise(data: any): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          console.log("Async Task Complete");
          if (true) {
            resolve(JSON.stringify({ Id: 1, Person: "Hugo Wolf" }));
          } else {
            // reject("Big Error: Promise rejected");
          }
        }, 1000);
      });
    }

    getMockPromise("Hello World")
      .then(data => this.logPipe("Date received from getMockPromise", data))
      .catch(err => console.log("Err:", err));
  }

  chainingPromises() {
    debugger;

    function popFirstAsync(data: Voucher[]): Promise<Voucher[]> {
      return new Promise<Voucher[]>((resolve, reject) => {
        setTimeout(() => {
          console.log("popFirstAsync() received data", data);
          if (true) {
            resolve(data.slice(1, data.length));
          } else {
            // Commented out because unreachable
            // reject("Big Error: Promise rejected");
          }
        }, 1000);
      });
    }

    $.ajax({
      type: "GET",
      url: this.url,
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .then(data => popFirstAsync(data))
      .then(data => this.logPipe("Data after processing", data))
      .catch(err => this.logPipe("Error in Chain: ", err));

    console.log("chainingPromises() finished");
  }

  usingFetch() {
    debugger;

    fetch(this.url)
      .then<Voucher[]>((resp: Response) => {
        console.log("Response received from fetch", resp);
        return resp.json();
      })
      .then((data: Voucher[]) => {
        console.log("Data received from fetch", data);
      });
  }

  postFetch() {
    debugger;

    let vouchersapi = "http://localhost:5000/api/vouchers";

    let data = {
      Date: "01.01.2016",
      Amount: 100,
      Text: "Posted Voucher",
      Paid: false
    };

    let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    fetch(vouchersapi, options)
      .then(function(res) {
        if (res.ok) {
          return res.statusText;
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  usingFetchAwait() {
    debugger;
    async function getAllVouchers() {
      let response = await fetch("/assets/vouchers.json");
      let voucher = await response.json();
      console.log("Data received using fetch - await: ", voucher);
    }

    getAllVouchers();
  }

  consumeService() {
    debugger;

    var service = new VoucherService();
    service.getVouchers().then((data: Voucher[]) => {
      console.log("Data from VoucherService ", data);
    });
  }

  consumeGenericService() {
    debugger;

    let serviceOfT: GenericService<Voucher> = new GenericService<Voucher>(
      this.url
    );

    serviceOfT.getItems().then((data: Voucher[]) => {
      let vs: Voucher[] = data;
      console.log("Data received from Generic Service: ", data);
    });
  }
}

export class VoucherService {
  getVouchers(): Promise<Voucher[]> {
    let url = "vouchers.json";

    return new Promise<Voucher[]>((resolve, reject) => {
      fetch(url)
        .then(data => {
          resolve(data.json());
        })
        .catch(err => {
          console.log("error calling service");
          console.log(err);
          return reject(err);
        });
    });
  }

  getVouchersObs(): Observable<Voucher[]> {
    return from(this.getVouchers());
  }
}
