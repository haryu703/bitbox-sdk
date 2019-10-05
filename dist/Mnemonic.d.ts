/// <reference types="node" />
import { Address } from "./Address";
export declare class Mnemonic {
    private _address;
    constructor(address?: Address);
    generate(bits?: number, wordlist?: string[]): string;
    fromEntropy(bytes: Buffer, wordlist?: string[]): string;
    toEntropy(mnemonic: string, wordlist?: string[]): Buffer;
    validate(mnemonic: string, wordlist?: string[]): string;
    toSeed(mnemonic: string, password?: string): Buffer;
    wordLists(): {
        [key: string]: string[];
    };
    toKeypairs(mnemonic: string, numberOfKeypairs?: number, regtest?: boolean): {
        privateKeyWIF: string;
        address: string;
    }[];
    findNearestWord(word: string, wordlist: string[]): string;
}
