import { BalanceAccount } from './BalanceAccount';

export class VoucherDetail {
    ID: number;
    VoucherID: number;
    AccountID: number;
    Account: BalanceAccount;
    Text: string;
    Amount: number;
    Comment: string;
}
