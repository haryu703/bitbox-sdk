/// <reference types="node" />
import * as bcl from "bitcoinforksjs-lib";
export declare enum HashTypes {
    SIGHASH_ALL = 1,
    SIGHASH_NONE = 2,
    SIGHASH_SINGLE = 3,
    SIGHASH_ANYONECANPAY = 128,
    SIGHASH_BITCOINCASH_BIP143 = 64,
    ADVANCED_TRANSACTION_MARKER = 0,
    ADVANCED_TRANSACTION_FLAG = 1
}
export declare class TransactionBuilder {
    transaction: bcl.TransactionBuilder;
    DEFAULT_SEQUENCE: number;
    p2shInput: boolean;
    tx: bcl.Transaction | undefined;
    private _address;
    constructor(network?: string);
    setSchnorr(enable?: boolean): void;
    addInput(txHash: string, vout: number, sequence?: number, prevOutScript?: string | Buffer | undefined): void;
    addInputScript(vout: number, script: Buffer): void;
    addInputScripts(scripts: {
        script: Buffer;
        vout: number;
    }[]): void;
    addOutput(scriptPubKey: string | Buffer, amount: number): void;
    setLockTime(locktime: number): void;
    sign(vin: number, keyPair: bcl.ECPairInterface, redeemScript: Buffer | undefined, hashType: number | undefined, value: number): void;
    build(): bcl.Transaction;
}
