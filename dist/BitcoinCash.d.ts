import { Address } from "./Address";
export interface EncodeBIP21Options {
    amount?: number;
    label?: string;
    message?: string;
}
export interface BIP21Object {
    address: string;
    options?: EncodeBIP21Options;
}
export interface ByteCountInput {
    P2PKH?: number;
}
export interface ByteCountOutput {
    P2PKH?: number;
    P2SH?: number;
}
export declare class BitcoinCash {
    private _address;
    constructor(address?: Address);
    toSatoshi(coins: number): number;
    toBitcoinCash(satoshis: number): number;
    toBits(satoshis: number): number;
    satsToBits(satoshis: number): number;
    signMessageWithPrivKey(privateKeyWIF: string, message: string): string;
    verifyMessage(address: string, signature: string, message: string): boolean;
    encodeBase58Check(hex: string): string;
    decodeBase58Check(address: string): string;
    encodeBIP21(address: string, options: EncodeBIP21Options, regtest?: boolean): string;
    decodeBIP21(url: string): BIP21Object;
    getByteCount(inputs: any, outputs: any): number;
    encryptBIP38(privKeyWIF: string, passphrase: string): string;
    decryptBIP38(encryptedKey: string, passphrase: string, network?: string): string;
}
