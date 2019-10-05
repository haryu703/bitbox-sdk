"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcl = require("bitcoinforksjs-lib");
var BigInteger = require("bigi");
var Address_1 = require("./Address");
var Schnorr_1 = require("./Schnorr");
var SignatureAlgorithm;
(function (SignatureAlgorithm) {
    SignatureAlgorithm[SignatureAlgorithm["ECDSA"] = 0] = "ECDSA";
    SignatureAlgorithm[SignatureAlgorithm["SCHNORR"] = 1] = "SCHNORR";
})(SignatureAlgorithm = exports.SignatureAlgorithm || (exports.SignatureAlgorithm = {}));
var ECPair = /** @class */ (function () {
    function ECPair(address) {
        if (address === void 0) { address = new Address_1.Address(); }
        this._address = address;
        this._schnorr = new Schnorr_1.Schnorr();
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
        switch (signatureAlgorithm) {
            case SignatureAlgorithm.ECDSA:
                var sig = ecpair.sign(buffer);
                var der = bcl.script.signature.encode(sig, 0x01).slice(0, -1);
                return der;
            case SignatureAlgorithm.SCHNORR:
                var priv = BigInteger.fromBuffer(ecpair.privateKey);
                return this._schnorr.sign(priv, buffer);
            default:
                throw new Error("unknown signature algorithm " + signatureAlgorithm);
        }
    };
    ECPair.prototype.verify = function (ecpair, buffer, signature) {
        if (signature.length !== 64) {
            /// ECDSA
            var decoded = bcl.script.signature.decode(Buffer.concat([signature, Buffer.from([0x01])]));
            return ecpair.verify(buffer, decoded.signature);
        }
        else {
            // Schnorr
            return this._schnorr.verify(ecpair.publicKey, buffer, signature);
        }
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