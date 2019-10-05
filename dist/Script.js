"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcl = require("bitcoinforksjs-lib");
// consts
var opcodes = require("bitcoincash-ops");
var Script = /** @class */ (function () {
    function Script() {
        this.opcodes = opcodes;
        this.number = bcl.script.number;
    }
    Script.prototype.encode = function (scriptChunks) {
        var arr = [];
        scriptChunks.forEach(function (chunk) {
            arr.push(chunk);
        });
        return bcl.script.compile(arr);
    };
    Script.prototype.decode = function (scriptBuffer) {
        var decoded = bcl.script.decompile(scriptBuffer);
        if (!decoded) {
            throw new Error("failed to decode " + scriptBuffer);
        }
        return decoded;
    };
    Script.prototype.toASM = function (buffer) {
        return bcl.script.toASM(buffer);
    };
    Script.prototype.fromASM = function (asm) {
        return bcl.script.fromASM(asm);
    };
    Script.prototype.encodeNullDataOutput = function (data) {
        var output = bcl.payments.embed({ data: [data] }).output;
        if (!output) {
            throw new Error("failed to encode null data output " + data);
        }
        return output;
    };
    Script.prototype.encodeP2PKInput = function (signature) {
        var input = bcl.payments.p2pk({ signature: signature }).input;
        if (!input) {
            throw new Error("failed to encode p2pk input " + signature);
        }
        return input;
    };
    Script.prototype.encodeP2PKOutput = function (pubKey) {
        var output = bcl.payments.p2pk({ pubkey: pubKey }).output;
        if (!output) {
            throw new Error("failed to encode p2pk output " + pubKey);
        }
        return output;
    };
    Script.prototype.encodeP2PKHInput = function (signature, pubKey) {
        var input = bcl.payments.p2pkh({ signature: signature, pubkey: pubKey }).input;
        if (!input) {
            throw new Error("failed to encode p2pkh input " + signature + ", " + pubKey);
        }
        return input;
    };
    Script.prototype.encodeP2PKHOutput = function (identifier) {
        var output = bcl.payments.p2pkh({ hash: identifier }).output;
        if (!output) {
            throw new Error("failed to encode p2pkh output " + identifier);
        }
        return output;
    };
    Script.prototype.encodeP2MSInput = function (signatures) {
        var input = bcl.payments.p2ms({ signatures: signatures }).input;
        if (!input) {
            throw new Error("failed to encode p2ms input " + signatures);
        }
        return input;
    };
    Script.prototype.encodeP2MSOutput = function (m, pubKeys) {
        var output = bcl.payments.p2ms({ m: m, pubkeys: pubKeys }).output;
        if (!output) {
            throw new Error("failed to encode p2ms output " + m + ", " + pubKeys);
        }
        return output;
    };
    Script.prototype.encodeP2SHInput = function (redeemScriptSig, redeemScript) {
        var input = bcl.payments.p2sh({ redeem: { output: redeemScript, input: redeemScriptSig } }).input;
        if (!input) {
            throw new Error("failed to encode p2sh input " + redeemScript + ", " + redeemScriptSig);
        }
        return input;
    };
    Script.prototype.encodeP2SHOutput = function (scriptHash) {
        var output = bcl.payments.p2sh({ hash: scriptHash }).output;
        if (!output) {
            throw new Error("failed to encode p2sh output " + scriptHash);
        }
        return output;
    };
    Script.prototype.encodeNumber = function (number) {
        return this.number.encode(number);
    };
    Script.prototype.decodeNumber = function (buffer, maxLength, minimal) {
        return this.number.decode(buffer, maxLength, minimal);
    };
    return Script;
}());
exports.Script = Script;
//# sourceMappingURL=Script.js.map