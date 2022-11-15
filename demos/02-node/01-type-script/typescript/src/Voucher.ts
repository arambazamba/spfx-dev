import { VoucherDetail } from './VoucherDetail';

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
