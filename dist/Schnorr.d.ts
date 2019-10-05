/// <reference types="node" />
import * as BigInteger from "bigi";
export interface Session {
    sessionId: Buffer;
    message: Buffer;
    pubKeyCombined: Buffer;
    ell: Buffer;
    idx: number;
}
export declare class Schnorr {
    sign(privateKey: BigInteger, message: Buffer): Buffer;
    verify(publicKey: Buffer, message: Buffer, signatureToVerify: Buffer): boolean;
    batchVerify(publicKeys: Buffer[], messages: Buffer[], signaturesToVerify: Buffer[]): void;
    nonInteractive(privateKeys: BigInteger, message: Buffer): Buffer;
    computeEll(publicKeys: BigInteger): Buffer;
    publicKeyCombine(publicKeys: Buffer[], publicKeyHash: Buffer): Buffer;
    sessionInitialize(sessionId: Buffer, privateKey: BigInteger, message: Buffer, pubKeyCombined: Buffer, ell: Buffer, idx: number): Session;
    sessionNonceCombine(session: Session, nonces: Buffer[]): Buffer;
    partialSign(session: Session, message: Buffer, nonceCombined: Buffer, pubKeyCombined: Buffer): void;
    partialSignatureVerify(session: Session, partialSignature: Buffer, nonceCombined: Buffer, idx: number, pubKey: Buffer, nonce: Buffer): void;
    partialSignaturesCombine(nonceCombined: Buffer, partialSignatures: Buffer): Buffer;
    bufferToInt(buffer: Buffer): BigInteger;
    intToBuffer(bigInteger: BigInteger): Buffer;
    hash(buffer: Buffer): Buffer;
    pointToBuffer(point: any): any;
    pubKeyToPoint(publicKey: any): any;
}
