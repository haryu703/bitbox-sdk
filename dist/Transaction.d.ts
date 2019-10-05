import { TxnDetailsResult } from "bitcoin-com-rest";
export declare class Transaction {
    restURL: string;
    constructor(restURL?: string);
    details(txid: string | string[]): Promise<TxnDetailsResult | TxnDetailsResult[]>;
}
