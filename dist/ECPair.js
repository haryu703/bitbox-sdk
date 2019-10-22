"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcl = require("bitcoinforksjs-lib");
var Address_1 = require("./Address");
var SignatureAlgorithm;
(function (SignatureAlgorithm) {
    SignatureAlgorithm[SignatureAlgorithm["ECDSA"] = 0] = "ECDSA";
    SignatureAlgorithm[SignatureAlgorithm["SCHNORR"] = 1] = "SCHNORR";
})(SignatureAlgorithm = exports.SignatureAlgorithm || (exports.SignatureAlgorithm = {}));
var ECPair = /** @class */ (function () {
    function ECPair(address) {
        if (address === void 0) { address = new Address_1.Address(); }
        this._address = address;
    }
    ECPair.prototype.fromWIF = function (privateKeyWIF) {
        var network = "mainnet";
        if (privateKeyWIF[0] === "L" || privateKeyWIF[0] === "K")
            network = "mainnet";
        else if (privateKeyWIF[0] === "c")
            network = "testnet";
        var bitcoincash;
        if (network === "mainnet")
            bitcoincash = bcl.networks.bitcoin;
        else
            bitcoincash = bcl.networks.testnet;
        return bcl.ECPair.fromWIF(privateKeyWIF, bitcoincash);
    };
    ECPair.prototype.toWIF = function (ecpair) {
        return ecpair.toWIF();
    };
    ECPair.prototype.sign = function (ecpair, buffer, signatureAlgorithm) {
        if (signatureAlgorithm === void 0) { signatureAlgorithm = SignatureAlgorithm.ECDSA; }
        var useSchnorr = signatureAlgorithm === SignatureAlgorithm.SCHNORR;
        return ecpair.sign(buffer, undefined, useSchnorr);
    };
    ECPair.prototype.verify = function (ecpair, buffer, signature, signatureAlgorithm) {
        if (signatureAlgorithm === void 0) { signatureAlgorithm = SignatureAlgorithm.ECDSA; }
        var useSchnorr = signatureAlgorithm === SignatureAlgorithm.SCHNORR;
        return ecpair.verify(buffer, signature, useSchnorr);
    };
    ECPair.prototype.fromPublicKey = function (pubkeyBuffer) {
        return bcl.ECPair.fromPublicKey(pubkeyBuffer);
    };
    ECPair.prototype.toPublicKey = function (ecpair) {
        return ecpair.getPublicKey ? ecpair.getPublicKey() : ecpair.publicKey;
    };
    ECPair.prototype.toLegacyAddress = function (ecpair) {
        var address = bcl.payments.p2pkh({ pubkey: ecpair.publicKey }).address;
        if (!address) {
            throw new Error("failed to convert " + ecpair + " to legacy address");
        }
        return address;
    };
    ECPair.prototype.toCashAddress = function (ecpair, regtest) {
        if (regtest === void 0) { regtest = false; }
        var address = this.toLegacyAddress(ecpair);
        return this._address.toCashAddress(address, true, regtest);
    };
    return ECPair;
}());
exports.ECPair = ECPair;
//# sourceMappingURL=ECPair.js.map