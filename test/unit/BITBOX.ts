// imports
import * as assert from "assert";
import { BITBOX } from "../../src/BITBOX"
import { Address } from "../../src/Address"
import { BitcoinCash } from "../../src/BitcoinCash"
import { Block } from "../../src/Block"
import { Blockchain } from "../../src/Blockchain"
import { Control } from "../../src/Control"
import { Generating } from "../../src/Generating"
import { HDNode } from "../../src/HDNode"
import { Mining } from "../../src/Mining"
import { Mnemonic } from "../../src/Mnemonic"
import { Price } from "../../src/Price"
import { RawTransactions } from "../../src/RawTransactions"
import { Script } from "../../src/Script"
import { Transaction } from "../../src/Transaction"
import { TransactionBuilder } from "../../src/TransactionBuilder"
import { Util } from "../../src/Util"
import { Schnorr } from "../../src/Schnorr"
import { REST_URL } from "../../src/BITBOX"
import { Socket } from "../../src/Socket"


describe("#BITBOX", (): void => {
  describe("#BITBOXConstructor", (): void => {
    it("should create instance of BITBOX", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox instanceof BITBOX, true)
    })

    it("should have a restURL property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
      assert.equal(bitbox.restURL, REST_URL)
    })

    it("should have a Address property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Address instanceof Address, true)
    })

    it("should have a BitcoinCash property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.BitcoinCash instanceof BitcoinCash, true)
    })

    it("should have a Block property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Block instanceof Block, true)
    })

    it("should have a Blockchain property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Blockchain instanceof Blockchain, true)
    })

    it("should have a Control property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Control instanceof Control, true)
    })

    it("should have a Generating property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Generating instanceof Generating, true)
    })

    it("should have a HDNode property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.HDNode instanceof HDNode, true)
    })

    it("should have a Mining property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Mining instanceof Mining, true)
    })

    it("should have a Mnemonic property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Mnemonic instanceof Mnemonic, true)
    })

    it("should have a Price property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Price instanceof Price, true)
    })

    it("should have a RawTransactions property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.RawTransactions instanceof RawTransactions, true)
    })

    it("should have a Script property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Script instanceof Script, true)
    })

    it("should have a Transaction property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Transaction instanceof Transaction, true)
    })

    // it("should have a TransactionBuilder property", (): void => {
    //   const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
    //   assert.equal(bitbox.TransactionBuilder instanceof TransactionBuilder, true)
    // })

    it("should have a Util property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Util instanceof Util, true)
    })

    it("should have a Schnorr property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.equal(bitbox.Schnorr instanceof Schnorr, true)
    })

    it("should have a Socket property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: REST_URL })
      assert.strictEqual(bitbox.Socket, Socket)
    })
  })
})
