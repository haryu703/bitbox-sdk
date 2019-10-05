/// <reference types="node" />
import { AddressDetailsResult, AddressUnconfirmedResult, AddressUtxoResult } from "bitcoin-com-rest";
export declare class Address {
    restURL: string;
    constructor(restURL?: string);
    toLegacyAddress(address: string): string;
    toCashAddress(address: string, prefix?: boolean, regtest?: boolean): string;
    legacyToHash160(address: string): string;
    cashToHash160(address: string): string;
    hash160ToLegacy(hash160: string, network?: number): string;
    hash160ToCash(hash160: string, network?: number, regtest?: boolean): string;
    isLegacyAddress(address: string): boolean;
    isCashAddress(address: string): boolean;
    isHash160(address: string): boolean;
    isMainnetAddress(address: string): boolean;
    isTestnetAddress(address: string): boolean;
    isRegTestAddress(address: string): boolean;
    isP2PKHAddress(address: string): boolean;
    isP2SHAddress(address: string): boolean;
    detectAddressFormat(address: string): string;
    detectAddressNetwork(address: string): string;
    detectAddressType(address: string): string;
    fromXPub(xpub: string, path?: string): string;
    fromXPriv(xpriv: string, path?: string): string;
    fromOutputScript(scriptPubKey: Buffer, network?: string): string;
    details(address: string | string[]): Promise<AddressDetailsResult | AddressDetailsResult[]>;
    utxo(address: string | string[]): Promise<AddressUtxoResult | AddressUtxoResult[]>;
    unconfirmed(address: string | string[]): Promise<AddressUnconfirmedResult | AddressUnconfirmedResult[]>;
    transactions(address: string | string[]): Promise<any>;
    private _detectHash160Format;
    private _decode;
    private _decodeHash160;
    private _decodeLegacyAddress;
    private _decodeCashAddress;
    private _decodeAddressFromHash160;
}
