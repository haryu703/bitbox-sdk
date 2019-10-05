// imports
import * as bcl from "bitcoinforksjs-lib"
import { Address } from "./Address"

// consts
// const bip32utils = require("bip32-utils")

export class HDNode {
  private _address: Address
  constructor(address: Address = new Address()) {
    this._address = address
  }

  private toNetwork(network: string): bcl.Network {
    let bitcoincash: bcl.Network
    if (network === "bitcoincash" || network === "mainnet")
      bitcoincash = bcl.networks.bitcoin
    else bitcoincash = bcl.networks.testnet

    return bitcoincash
  }

  public fromSeed(
    rootSeedBuffer: Buffer,
    network: string = "mainnet"
  ): bcl.BIP32Interface {
    return bcl.bip32.fromSeed(
      rootSeedBuffer,
      this.toNetwork(network)
    )
  }

  public toLegacyAddress(hdNode: bcl.BIP32Interface): string {
    const address = bcl.payments.p2pkh({ pubkey: hdNode.publicKey }).address
    if (!address) {
      throw new Error(`failed to convert hdnode to legacy address ${hdNode}`)
    }
    return address
  }

  public toCashAddress(hdNode: bcl.BIP32Interface, regtest: boolean = false): string {
    return this._address.toCashAddress(this.toLegacyAddress(hdNode), true, regtest)
  }

  public toWIF(hdNode: bcl.BIP32Interface): string {
    return hdNode.toWIF()
  }

  public toXPub(hdNode: bcl.BIP32Interface): string {
    return hdNode.neutered().toBase58()
  }

  public toXPriv(hdNode: bcl.BIP32Interface): string {
    return hdNode.toBase58()
  }

  public toKeyPair(hdNode: bcl.BIP32Interface): bcl.ECPairInterface {
    const network = hdNode.network.wif === bcl.networks.bitcoin.wif ? bcl.networks.bitcoin : bcl.networks.testnet
    return bcl.ECPair.fromWIF(hdNode.toWIF(), network)
  }

  public toPublicKey(hdNode: bcl.BIP32Interface): Buffer {
    return hdNode.publicKey
  }

  public fromXPriv(xpriv: string): bcl.BIP32Interface {
    let bitcoincash: bcl.Network
    if (xpriv[0] === "x") bitcoincash = bcl.networks.bitcoin
    else bitcoincash = bcl.networks.testnet

    return bcl.bip32.fromBase58(xpriv, bitcoincash)
  }

  public fromXPub(xpub: string): bcl.BIP32Interface {
    let bitcoincash: bcl.Network
    if (xpub[0] === "x") bitcoincash = bcl.networks.bitcoin
    else bitcoincash = bcl.networks.testnet

    return bcl.bip32.fromBase58(xpub, bitcoincash)
  }

  public derivePath(hdnode: bcl.BIP32Interface, path: string): bcl.BIP32Interface {
    return hdnode.derivePath(path)
  }

  public derive(hdnode: bcl.BIP32Interface, path: number): bcl.BIP32Interface {
    return hdnode.derive(path)
  }

  public deriveHardened(hdnode: bcl.BIP32Interface, path: number): bcl.BIP32Interface {
    return hdnode.deriveHardened(path)
  }

  public sign(hdnode: bcl.BIP32Interface, buffer: Buffer): Buffer {
    return hdnode.sign(buffer)
  }

  public verify(
    hdnode: bcl.BIP32Interface,
    buffer: Buffer,
    signature: Buffer
  ): boolean {
    return hdnode.verify(buffer, signature)
  }

  public isPublic(hdnode: bcl.BIP32Interface): boolean {
    return hdnode.isNeutered()
  }

  public isPrivate(hdnode: bcl.BIP32Interface): boolean {
    return !hdnode.isNeutered()
  }

  public toIdentifier(hdnode: bcl.BIP32Interface): Buffer {
    return hdnode.identifier
  }

  public fromBase58(base58: string, network: string): bcl.BIP32Interface {
    return bcl.bip32.fromBase58(base58, this.toNetwork(network))
  }

  // public createAccount(hdNodes: bcl.BIP32Interface[]): object {
  //   const arr: any = hdNodes.map(
  //     (item: any, index: number) => new bip32utils.Chain(item.neutered())
  //   )
  //   return new bip32utils.Account(arr)
  // }

  // public createChain(hdNode: bcl.BIP32Interface): object {
  //   return new bip32utils.Chain(hdNode)
  // }
}
