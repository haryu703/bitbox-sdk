"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomBytes = require("randombytes");
var bcl = require("bitcoinforksjs-lib");
var Crypto = /** @class */ (function () {
    function Crypto() {
    }
    Crypto.prototype.sha1 = function (buffer) {
        return bcl.crypto.sha1(buffer);
    };
    Crypto.prototype.sha256 = function (buffer) {
        return bcl.crypto.sha256(buffer);
    };
    Crypto.prototype.ripemd160 = function (buffer) {
        return bcl.crypto.ripemd160(buffer);
    };
    Crypto.prototype.hash256 = function (buffer) {
        return bcl.crypto.hash256(buffer);
    };
    Crypto.prototype.hash160 = function (buffer) {
        return bcl.crypto.hash160(buffer);
    };
    Crypto.prototype.randomBytes = function (size) {
        if (size === void 0) { size = 16; }
        return randomBytes(size);
    };
    return Crypto;
}());
exports.Crypto = Crypto;
//# sourceMappingURL=Crypto.js.map