/// <reference types="node" />
import * as bcl from "bitcoinforksjs-lib";
import { Address } from "./Address";
export declare class HDNode {
    private _address;
    constructor(address?: Address);
    private toNetwork;
    fromSeed(rootSeedBuffer: Buffer, network?: string): bcl.BIP32Interface;
    toLegacyAddress(hdNode: bcl.BIP32Interface): string;
    toCashAddress(hdNode: bcl.BIP32Interface, regtest?: boolean): string;
    toWIF(hdNode: bcl.BIP32Interface): string;
    toXPub(hdNode: bcl.BIP32Interface): string;
    toXPriv(hdNode: bcl.BIP32Interface): string;
    toKeyPair(hdNode: bcl.BIP32Interface): bcl.ECPairInterface;
    toPublicKey(hdNode: bcl.BIP32Interface): Buffer;
    fromXPriv(xpriv: string): bcl.BIP32Interface;
    fromXPub(xpub: string): bcl.BIP32Interface;
    derivePath(hdnode: bcl.BIP32Interface, path: string): bcl.BIP32Interface;
    derive(hdnode: bcl.BIP32Interface, path: number): bcl.BIP32Interface;
    deriveHardened(hdnode: bcl.BIP32Interface, path: number): bcl.BIP32Interface;
    sign(hdnode: bcl.BIP32Interface, buffer: Buffer): Buffer;
    verify(hdnode: bcl.BIP32Interface, buffer: Buffer, signature: Buffer): boolean;
    isPublic(hdnode: bcl.BIP32Interface): boolean;
    isPrivate(hdnode: bcl.BIP32Interface): boolean;
    toIdentifier(hdnode: bcl.BIP32Interface): Buffer;
    fromBase58(base58: string, network: string): bcl.BIP32Interface;
}
