import { VerboseRawTransactionResult } from "bitcoin-com-rest";
export declare class RawTransactions {
    restURL: string;
    constructor(restURL?: string);
    decodeRawTransaction(hex: string | string[]): Promise<any | any[]>;
    decodeScript(script: string | string[]): Promise<any | any[]>;
    getRawTransaction(txid: string | string[], verbose?: boolean): Promise<VerboseRawTransactionResult | VerboseRawTransactionResult[] | string | string[]>;
    sendRawTransaction(hex: string | string[], allowhighfees?: boolean): Promise<any | any[]>;
}
