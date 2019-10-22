import * as bcl from "bitcoinforksjs-lib"

import { Address } from "./Address"

export enum SignatureAlgorithm {
  ECDSA = 0x00,
  SCHNORR = 0x01,
}

export class ECPair {
  private _address: Address
  constructor(address: Address = new Address()) {
    this._address = address
  }

  public fromWIF(privateKeyWIF: string): bcl.ECPair.ECPairInterface {
    let network: string = "mainnet"
    if (privateKeyWIF[0] === "L" || privateKeyWIF[0] === "K")
      network = "mainnet"
    else if (privateKeyWIF[0] === "c") network = "testnet"

    let bitcoincash: bcl.Network
    if (network === "mainnet") bitcoincash = bcl.networks.bitcoin
    else bitcoincash = bcl.networks.testnet

    return bcl.ECPair.fromWIF(privateKeyWIF, bitcoincash)
  }

  public toWIF(ecpair: bcl.ECPair.ECPairInterface): string {
    return ecpair.toWIF()
  }

  public sign(
    ecpair: bcl.ECPair.ECPairInterface,
    buffer: Buffer,
    signatureAlgorithm: SignatureAlgorithm = SignatureAlgorithm.ECDSA
  ): Buffer {
    const useSchnorr = signatureAlgorithm === SignatureAlgorithm.SCHNORR
    return ecpair.sign(buffer, undefined, useSchnorr)
  }

  public verify(
    ecpair: bcl.ECPair.ECPairInterface,
    buffer: Buffer,
    signature: Buffer,
    signatureAlgorithm: SignatureAlgorithm = SignatureAlgorithm.ECDSA
  ): boolean {
    const useSchnorr = signatureAlgorithm === SignatureAlgorithm.SCHNORR
    return ecpair.verify(buffer, signature, useSchnorr)
  }

  public fromPublicKey(pubkeyBuffer: Buffer): bcl.ECPair.ECPairInterface {
    return bcl.ECPair.fromPublicKey(pubkeyBuffer)
  }

  public toPublicKey(ecpair: bcl.ECPair.ECPairInterface): Buffer {
    return ecpair.getPublicKey ? ecpair.getPublicKey() : ecpair.publicKey
  }

  public toLegacyAddress(ecpair: bcl.ECPair.ECPairInterface): string {
    const { address } = bcl.payments.p2pkh({ pubkey: ecpair.publicKey })
    if (!address) {
      throw new Error(`failed to convert ${ecpair} to legacy address`)
    }
    return address
  }

  public toCashAddress(ecpair: bcl.ECPair.ECPairInterface, regtest: boolean = false): string {
    const address = this.toLegacyAddress(ecpair)
    return this._address.toCashAddress(address, true, regtest)
  }
}
