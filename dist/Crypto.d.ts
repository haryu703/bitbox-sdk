/// <reference types="node" />
export declare class Crypto {
    sha1(buffer: Buffer): Buffer;
    sha256(buffer: Buffer): Buffer;
    ripemd160(buffer: Buffer): Buffer;
    hash256(buffer: Buffer): Buffer;
    hash160(buffer: Buffer): Buffer;
    randomBytes(size?: number): Buffer;
}
