import * as bcl from "bitcoinforksjs-lib"
import * as BigInteger from "bigi"

import { Address } from "./Address"
import { Schnorr } from "./Schnorr"

export enum SignatureAlgorithm {
  ECDSA = 0x00,
  SCHNORR = 0x01,
}

export class ECPair {
  private _address: Address
  private _schnorr: Schnorr
  constructor(address: Address = new Address()) {
    this._address = address
    this._schnorr = new Schnorr()
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
    switch (signatureAlgorithm) {
      case SignatureAlgorithm.ECDSA:
        const sig = ecpair.sign(buffer)
        const der = bcl.script.signature.encode(sig, 0x01).slice(0, -1)
        return der
      case SignatureAlgorithm.SCHNORR:
        const priv = BigInteger.fromBuffer(ecpair.privateKey)
        return this._schnorr.sign(priv, buffer)
      default:
        throw new Error(`unknown signature algorithm ${signatureAlgorithm}`)
    }
  }

  public verify(
    ecpair: bcl.ECPair.ECPairInterface,
    buffer: Buffer,
    signature: Buffer
  ): boolean {
    if (signature.length !== 64) {
      /// ECDSA
      const decoded = bcl.script.signature.decode(Buffer.concat([signature, Buffer.from([0x01])]))
      return ecpair.verify(buffer, decoded.signature)
    } else {
      // Schnorr
      return this._schnorr.verify(ecpair.publicKey, buffer, signature)
    }
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
