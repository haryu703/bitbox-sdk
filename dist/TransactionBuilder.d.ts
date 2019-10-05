/// <reference types="node" />
import * as bcl from "bitcoinforksjs-lib";
import { SignatureAlgorithm } from ".";
declare interface HashTypes {
    SIGHASH_ALL: number;
    SIGHASH_NONE: number;
    SIGHASH_SINGLE: number;
    SIGHASH_ANYONECANPAY: number;
    SIGHASH_BITCOINCASH_BIP143: number;
    ADVANCED_TRANSACTION_MARKER: number;
    ADVANCED_TRANSACTION_FLAG: number;
}
export declare class TransactionBuilder {
    transaction: bcl.TransactionBuilder;
    DEFAULT_SEQUENCE: number;
    hashTypes: HashTypes;
    p2shInput: boolean;
    tx: bcl.Transaction | undefined;
    private _address;
    constructor(network?: string);
    addInput(txHash: string, vout: number, sequence?: number, prevOutScript?: string | Buffer | undefined): void;
    addInputScript(vout: number, script: Buffer): void;
    addInputScripts(scripts: {
        script: Buffer;
        vout: number;
    }[]): void;
    addOutput(scriptPubKey: string | Buffer, amount: number): void;
    setLockTime(locktime: number): void;
    sign(vin: number, keyPair: bcl.ECPairInterface, redeemScript: Buffer | undefined, hashType: number | undefined, value: number, signatureAlgorithm?: SignatureAlgorithm): void;
    build(): bcl.Transaction;
}
export {};
