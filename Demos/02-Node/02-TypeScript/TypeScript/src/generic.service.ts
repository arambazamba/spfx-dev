import * as $ from "jquery";
import { IObject } from "./model";

export class GenericService<T extends IObject> {
  constructor(public url: string) {}

  getItems(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: this.url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success(data: T[]) {
          resolve(data);
        },
        error(err: any) {
          console.log("error calling service");
          reject(err);
        }
      });
    });
  }

  getItem(id: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: `${this.url}/${id}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success(data: T) {
          resolve(data);
        },
        error(err: any) {
          console.log("error calling service");
          reject(err);
        }
      });
    });
  }

  save(item: T) {
    return new Promise<T>((resolve, reject) => {
      $.ajax({
        type: item.ID === 0 ? "POST" : "PUT",
        url: this.url,
        data: JSON.stringify(item),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success(data: T) {
          resolve(data);
        },
        error(err: any) {
          console.log("error calling service");
          reject(err);
        }
      });
    });
  }

  delete(id: number) {
    return new Promise<T>((resolve, reject) => {
      $.ajax({
        type: "DELETE",
        url: `${this.url}/${id}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success(data: T) {
          resolve(data);
        },
        error(err: any) {
          console.log("error calling service");
          reject(err);
        }
      });
    });
  }
}
