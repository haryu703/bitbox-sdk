/// <reference path="./interfaces/vendors.d.ts"/>

export * from "./Address"
export * from "./BITBOX"
export * from "./BitcoinCash"
export * from "./Block"
export * from "./Blockchain"
export * from "./CashAccounts"
export * from "./Control"
export * from "./Crypto"
export * from "./ECPair"
export * from "./Generating"
export * from "./HDNode"
export * from "./Mining"
export * from "./Mnemonic"
export * from "./Price"
export * from "./RawTransactions"
export * from "./Schnorr"
export * from "./Script"
export * from "./Socket"
export * from "./Transaction"
export * from "./TransactionBuilder"
export * from "./Util"

export interface BchInfo {
  hashGenesisBlock: string
  port: number
  portRpc: number
  protocol: {
    magic: number
  }
  seedsDns: string[]
  versions: {
    bip32: {
      private: number
      public: number
    }
    bip44: number
    private: number
    public: number
    scripthash: number
    messagePrefix: string
  }
  name: string
  per1: number
  unit: string
  testnet: boolean
  toBitcoinJS: any
  toBitcore: any
}
