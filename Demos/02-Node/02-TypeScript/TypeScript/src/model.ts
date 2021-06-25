export class VoucherDetail {
  ID: number;
  VoucherID: number;
  AccountID: number;
  Account: BalanceAccount;
  Text: string;
  Amount: number;
  Comment: string;
}

export class BalanceAccount {
  ID: number;
  Name: string;
  Expense: boolean;
  VoucherDetails: VoucherDetail[];
}

export class Voucher {
  ID: number;
  Text: string;
  Date: Date;
  Amount: number;
  Paid: boolean;
  Expense: boolean;
  Remark?: boolean;
  Readonly?: boolean;
  Details?: VoucherDetail[];
}

export interface IObject {
  ID: number;
}

export interface IClickCallback {
  (e: Event): void;
}

export interface IAjaxCallback {
  (data: any): void;
}

export class Movie {
  id?: number;
  title: string;
  startTime: Date;
  img: string;
  url: string;
}