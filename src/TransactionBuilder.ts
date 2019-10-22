// imports
import * as bcl from "bitcoinforksjs-lib"
import { Address } from "./Address"
import { TREST_URL } from "./BITBOX"

export enum HashTypes {
  SIGHASH_ALL = 0x01,
  SIGHASH_NONE = 0x02,
  SIGHASH_SINGLE = 0x03,
  SIGHASH_ANYONECANPAY = 0x80,
  SIGHASH_BITCOINCASH_BIP143 = 0x40,
  ADVANCED_TRANSACTION_MARKER = 0x00,
  ADVANCED_TRANSACTION_FLAG = 0x01,
}

export class TransactionBuilder {
  transaction: bcl.TransactionBuilder
  DEFAULT_SEQUENCE: number
  p2shInput: boolean
  tx: bcl.Transaction | undefined
  private _address: Address

  constructor(network: string = "mainnet") {
    let bitcoincash: bcl.Network
    if (network === "mainnet") {
      this._address = new Address()
    } else {
      this._address = new Address(TREST_URL)
    }
    if (network === "bitcoincash" || network === "mainnet")
      bitcoincash = bcl.networks.bitcoin
    else bitcoincash = bcl.networks.testnet

    this.transaction = new bcl.TransactionBuilder(bitcoincash)
    this.transaction.enableBitcoinCash(true)
    this.DEFAULT_SEQUENCE = 0xffffffff
    this.p2shInput = false
    this.tx
  }

  public setSchnorr(enable?: boolean) {
    this.transaction.setSchnorr(enable)
  }

  public addInput(
    txHash: string,
    vout: number,
    sequence: number = this.DEFAULT_SEQUENCE,
    prevOutScript: string | Buffer | undefined = undefined
  ): void {
    let script: Buffer | undefined
    if (typeof prevOutScript !== 'string') {
      script = prevOutScript
    } else {
      script = Buffer.from(prevOutScript, 'hex')
    }
    this.transaction.addInput(txHash, vout, sequence, script)
  }

  public addInputScript(vout: number, script: Buffer): void {
    this.tx = this.transaction.buildIncomplete()
    this.tx.setInputScript(vout, script)
    this.p2shInput = true
  }

  public addInputScripts(scripts: {script: Buffer, vout: number}[]): void {
    this.tx = this.transaction.buildIncomplete()
    scripts.forEach((script) => {
      this.tx!.setInputScript(script.vout, script.script)
    })
    this.p2shInput = true
  }

  public addOutput(scriptPubKey: string | Buffer, amount: number): void {
    try {
      this.transaction.addOutput(
        // @ts-ignore
        this._address.toLegacyAddress(scriptPubKey),
        amount
      )
    } catch (error) {
      this.transaction.addOutput(scriptPubKey, amount)
    }
  }

  public setLockTime(locktime: number): void {
    this.transaction.setLockTime(locktime)
  }

  public sign(
    vin: number,
    keyPair: bcl.ECPairInterface,
    redeemScript: Buffer | undefined,
    hashType: number = HashTypes.SIGHASH_ALL,
    value: number,
  ): void {
    const witnessScript = undefined

    this.transaction.sign(
      vin,
      keyPair,
      redeemScript,
      hashType | HashTypes.SIGHASH_BITCOINCASH_BIP143,
      value,
      witnessScript,
    )
  }

  public build(): bcl.Transaction {
    if (this.p2shInput === true) return this.tx!

    return this.transaction.build()
  }
}
