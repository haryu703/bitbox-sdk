import { CashAccountCheckResult, CashAccountLookupResult, CashAccountReverseLookupResult } from "bitcoin-com-rest";
export declare class CashAccounts {
    restURL: string;
    constructor(restURL?: string);
    lookup(account: string, number: number, collision?: number): Promise<CashAccountLookupResult>;
    check(account: string, number: number): Promise<CashAccountCheckResult>;
    reverseLookup(cashAddress: string): Promise<CashAccountReverseLookupResult>;
}
