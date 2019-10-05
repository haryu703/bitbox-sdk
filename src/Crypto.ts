import * as randomBytes from "randombytes"
import * as bcl from "bitcoinforksjs-lib"


export class Crypto {
  public sha1(buffer: Buffer): Buffer {
    return bcl.crypto.sha1(buffer)
  }

  public sha256(buffer: Buffer): Buffer {
    return bcl.crypto.sha256(buffer)
  }

  public ripemd160(buffer: Buffer): Buffer {
    return bcl.crypto.ripemd160(buffer)
  }

  public hash256(buffer: Buffer): Buffer {
    return bcl.crypto.hash256(buffer)
  }

  public hash160(buffer: Buffer): Buffer {
    return bcl.crypto.hash160(buffer)
  }

  public randomBytes(size: number = 16): Buffer {
    return randomBytes(size)
  }
}
