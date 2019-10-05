export interface AddressDetails {
    isvalid: boolean;
    address: string;
    scriptPubKey: string;
    ismine: boolean;
    iswatchonly: boolean;
    isscript: boolean;
    pubkey: string;
    iscompressed: boolean;
    account: string;
}
export declare class Util {
    restURL: string;
    constructor(restURL?: string);
    validateAddress(address: string | string[]): Promise<AddressDetails | AddressDetails[]>;
}
