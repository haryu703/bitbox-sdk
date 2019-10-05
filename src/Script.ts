import * as bcl from "bitcoinforksjs-lib"

// consts
const opcodes = require("bitcoincash-ops")

export interface opcodes {
  OP_FALSE: 0
  OP_0: 0
  OP_PUSHDATA1: 76
  OP_PUSHDATA2: 77
  OP_PUSHDATA4: 78
  OP_1NEGATE: 79
  OP_RESERVED: 80
  OP_TRUE: 81
  OP_1: 81
  OP_2: 82
  OP_3: 83
  OP_4: 84
  OP_5: 85
  OP_6: 86
  OP_7: 87
  OP_8: 88
  OP_9: 89
  OP_10: 90
  OP_11: 91
  OP_12: 92
  OP_13: 93
  OP_14: 94
  OP_15: 95
  OP_16: 96

  OP_NOP: 97
  OP_VER: 98
  OP_IF: 99
  OP_NOTIF: 100
  OP_VERIF: 101
  OP_VERNOTIF: 102
  OP_ELSE: 103
  OP_ENDIF: 104
  OP_VERIFY: 105
  OP_RETURN: 106
  OP_TOALTSTACK: 107
  OP_FROMALTSTACK: 108
  OP_2DROP: 109
  OP_2DUP: 110
  OP_3DUP: 111
  OP_2OVER: 112
  OP_2ROT: 113
  OP_2SWAP: 114
  OP_IFDUP: 115
  OP_DEPTH: 116
  OP_DROP: 117
  OP_DUP: 118
  OP_NIP: 119
  OP_OVER: 120
  OP_PICK: 121
  OP_ROLL: 122
  OP_ROT: 123
  OP_SWAP: 124
  OP_TUCK: 125
  OP_CAT: 126
  OP_SPLIT: 127
  OP_NUM2BIN: 128
  OP_BIN2NUM: 129
  OP_SIZE: 130
  OP_INVERT: 131
  OP_AND: 132
  OP_OR: 133
  OP_XOR: 134
  OP_EQUAL: 135
  OP_EQUALVERIFY: 136
  OP_RESERVED1: 137
  OP_RESERVED2: 138
  OP_1ADD: 139
  OP_1SUB: 140
  OP_2MUL: 141
  OP_2DIV: 142
  OP_NEGATE: 143
  OP_ABS: 144
  OP_NOT: 145
  OP_0NOTEQUAL: 146
  OP_ADD: 147
  OP_SUB: 148
  OP_MUL: 149
  OP_DIV: 150
  OP_MOD: 151
  OP_LSHIFT: 152
  OP_RSHIFT: 153
  OP_BOOLAND: 154
  OP_BOOLOR: 155
  OP_NUMEQUAL: 156
  OP_NUMEQUALVERIFY: 157
  OP_NUMNOTEQUAL: 158
  OP_LESSTHAN: 159
  OP_GREATERTHAN: 160
  OP_LESSTHANOREQUAL: 161
  OP_GREATERTHANOREQUAL: 162
  OP_MIN: 163
  OP_MAX: 164
  OP_WITHIN: 165
  OP_RIPEMD160: 166
  OP_SHA1: 167
  OP_SHA256: 168
  OP_HASH160: 169
  OP_HASH256: 170
  OP_CODESEPARATOR: 171
  OP_CHECKSIG: 172
  OP_CHECKSIGVERIFY: 173
  OP_CHECKMULTISIG: 174
  OP_CHECKMULTISIGVERIFY: 175
  OP_NOP1: 176
  OP_NOP2: 177
  OP_CHECKLOCKTIMEVERIFY: 177
  OP_NOP3: 178
  OP_CHECKSEQUENCEVERIFY: 178
  OP_NOP4: 179
  OP_NOP5: 180
  OP_NOP6: 181
  OP_NOP7: 182
  OP_NOP8: 183
  OP_NOP9: 184
  OP_NOP10: 185
  OP_CHECKDATASIG: 186
  OP_CHECKDATASIGVERIFY: 187
  OP_PUBKEYHASH: 253
  OP_PUBKEY: 254
  OP_INVALIDOPCODE: 255
}

export interface DecodedP2PKHInput {
  signature: Buffer
  pubKey: Buffer
}

export interface DecodedP2MSOutput {
  m: number
  pubKeys: Buffer[]
}

export interface DecodedP2SHInput {
  redeemScript: Buffer
  redeemScriptSig: Buffer
}

export interface nullData {
  output: {
    encode(data: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface pubKey {
  input: {
    encode(signature: Buffer): Buffer
    decode(input: Buffer): Buffer
    check(input: Buffer): boolean
    decodeStack(data: Buffer): Buffer
    encodeStack(data: Buffer): Buffer
  }
  output: {
    encode(pubKey: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface pubKeyHash {
  input: {
    encode(signature: Buffer, pubKey: Buffer): Buffer
    decode(data: Buffer): DecodedP2PKHInput
    check(data: Buffer): boolean
    decodeStack(data: Buffer): Buffer
    encodeStack(data: Buffer): Buffer
  }
  output: {
    encode(identifier: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface multisig {
  input: {
    encode(signatures: Buffer[]): Buffer
    decode(input: Buffer): Buffer[]
    check(input: Buffer): boolean
  }
  output: {
    encode(m: number, pubKeys: Buffer[]): Buffer
    decode(output: Buffer): DecodedP2MSOutput
    check(output: Buffer): boolean
  }
}

export interface scriptHash {
  input: {
    encode(redeemScriptSig: Buffer, redeemScript: Buffer): Buffer
    decode(input: Buffer): DecodedP2SHInput
    check(data: Buffer): boolean
    decodeStack(data: Buffer): Buffer
    encodeStack(data: Buffer): Buffer
  }
  output: {
    encode(scriptHash: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface scriptNumber {
  encode(number: number): Buffer
  decode(buffer: Buffer, maxLength?: number, minimal?: boolean): number
}

export class Script {
  public opcodes: opcodes
  public number: scriptNumber

  constructor() {
    this.opcodes = opcodes
    this.number = bcl.script.number
  }

  public encode(scriptChunks: Array<number | Buffer>): Buffer {
    const arr: Array<number | Buffer> = []
    scriptChunks.forEach((chunk: number | Buffer) => {
      arr.push(chunk)
    })
    return bcl.script.compile(arr)
  }

  public decode(scriptBuffer: Buffer): Array<number | Buffer> {
    const decoded = bcl.script.decompile(scriptBuffer)
    if (!decoded) {
      throw new Error(`failed to decode ${scriptBuffer}`)
    }
    return decoded
  }

  public toASM(buffer: Buffer): string {
    return bcl.script.toASM(buffer)
  }

  public fromASM(asm: string): Buffer {
    return bcl.script.fromASM(asm)
  }

  public encodeNullDataOutput(data: Buffer): Buffer {
    const output = bcl.payments.embed({data: [data]}).output
    if (!output) {
      throw new Error(`failed to encode null data output ${data}`)
    }
    return output
  }

  public encodeP2PKInput(signature: Buffer): Buffer {
    const input = bcl.payments.p2pk({signature}).input
    if (!input) {
      throw new Error(`failed to encode p2pk input ${signature}`)
    }
    return input
  }

  public encodeP2PKOutput(pubKey: Buffer): Buffer {
    const output = bcl.payments.p2pk({pubkey: pubKey}).output
    if (!output) {
      throw new Error(`failed to encode p2pk output ${pubKey}`)
    }
    return output
  }

  public encodeP2PKHInput(signature: Buffer, pubKey: Buffer): Buffer {
    const input = bcl.payments.p2pkh({signature, pubkey: pubKey }).input
    if (!input) {
      throw new Error(`failed to encode p2pkh input ${signature}, ${pubKey}`)
    }
    return input
  }

  public encodeP2PKHOutput(identifier: Buffer): Buffer {
    const output = bcl.payments.p2pkh({hash: identifier}).output
    if (!output) {
      throw new Error(`failed to encode p2pkh output ${identifier}`)
    }
    return output
  }

  public encodeP2MSInput(signatures: Buffer[]): Buffer {
    const input = bcl.payments.p2ms({signatures}).input
    if (!input) {
      throw new Error(`failed to encode p2ms input ${signatures}`)
    }
    return input
  }

  public encodeP2MSOutput(m: number, pubKeys: Buffer[]): Buffer {
    const output = bcl.payments.p2ms({m, pubkeys: pubKeys}).output
    if (!output) {
      throw new Error(`failed to encode p2ms output ${m}, ${pubKeys}`)
    }
    return output
  }

  public encodeP2SHInput(
    redeemScriptSig: Buffer,
    redeemScript: Buffer
  ): Buffer {
    const input = bcl.payments.p2sh({redeem: {output: redeemScript, input: redeemScriptSig} }).input
    if (!input) {
      throw new Error(`failed to encode p2sh input ${redeemScript}, ${redeemScriptSig}`)
    }
    return input
  }

  public encodeP2SHOutput(scriptHash: Buffer): Buffer {
    const output = bcl.payments.p2sh({ hash: scriptHash }).output
    if (!output) {
      throw new Error(`failed to encode p2sh output ${scriptHash}`)
    }
    return output
  }

  public encodeNumber(number: number): Buffer {
    return this.number.encode(number)
  }

  public decodeNumber(
    buffer: Buffer,
    maxLength?: number,
    minimal?: boolean
  ): number {
    return this.number.decode(buffer, maxLength, minimal)
  }
}
