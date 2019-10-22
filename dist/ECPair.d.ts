/// <reference types="node" />
import * as bcl from "bitcoinforksjs-lib";
import { Address } from "./Address";
export declare enum SignatureAlgorithm {
    ECDSA = 0,
    SCHNORR = 1
}
export declare class ECPair {
    private _address;
    constructor(address?: Address);
    fromWIF(privateKeyWIF: string): bcl.ECPair.ECPairInterface;
    toWIF(ecpair: bcl.ECPair.ECPairInterface): string;
    sign(ecpair: bcl.ECPair.ECPairInterface, buffer: Buffer, signatureAlgorithm?: SignatureAlgorithm): Buffer;
    verify(ecpair: bcl.ECPair.ECPairInterface, buffer: Buffer, signature: Buffer, signatureAlgorithm?: SignatureAlgorithm): boolean;
    fromPublicKey(pubkeyBuffer: Buffer): bcl.ECPair.ECPairInterface;
    toPublicKey(ecpair: bcl.ECPair.ECPairInterface): Buffer;
    toLegacyAddress(ecpair: bcl.ECPair.ECPairInterface): string;
    toCashAddress(ecpair: bcl.ECPair.ECPairInterface, regtest?: boolean): string;
}
