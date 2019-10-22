"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// imports
var bcl = require("bitcoinforksjs-lib");
var Address_1 = require("./Address");
var BITBOX_1 = require("./BITBOX");
var HashTypes;
(function (HashTypes) {
    HashTypes[HashTypes["SIGHASH_ALL"] = 1] = "SIGHASH_ALL";
    HashTypes[HashTypes["SIGHASH_NONE"] = 2] = "SIGHASH_NONE";
    HashTypes[HashTypes["SIGHASH_SINGLE"] = 3] = "SIGHASH_SINGLE";
    HashTypes[HashTypes["SIGHASH_ANYONECANPAY"] = 128] = "SIGHASH_ANYONECANPAY";
    HashTypes[HashTypes["SIGHASH_BITCOINCASH_BIP143"] = 64] = "SIGHASH_BITCOINCASH_BIP143";
    HashTypes[HashTypes["ADVANCED_TRANSACTION_MARKER"] = 0] = "ADVANCED_TRANSACTION_MARKER";
    HashTypes[HashTypes["ADVANCED_TRANSACTION_FLAG"] = 1] = "ADVANCED_TRANSACTION_FLAG";
})(HashTypes = exports.HashTypes || (exports.HashTypes = {}));
var TransactionBuilder = /** @class */ (function () {
    function TransactionBuilder(network) {
        if (network === void 0) { network = "mainnet"; }
        var bitcoincash;
        if (network === "mainnet") {
            this._address = new Address_1.Address();
        }
        else {
            this._address = new Address_1.Address(BITBOX_1.TREST_URL);
        }
        if (network === "bitcoincash" || network === "mainnet")
            bitcoincash = bcl.networks.bitcoin;
        else
            bitcoincash = bcl.networks.testnet;
        this.transaction = new bcl.TransactionBuilder(bitcoincash);
        this.transaction.enableBitcoinCash(true);
        this.DEFAULT_SEQUENCE = 0xffffffff;
        this.p2shInput = false;
        this.tx;
    }
    TransactionBuilder.prototype.setSchnorr = function (enable) {
        this.transaction.setSchnorr(enable);
    };
    TransactionBuilder.prototype.addInput = function (txHash, vout, sequence, prevOutScript) {
        if (sequence === void 0) { sequence = this.DEFAULT_SEQUENCE; }
        if (prevOutScript === void 0) { prevOutScript = undefined; }
        var script;
        if (typeof prevOutScript !== 'string') {
            script = prevOutScript;
        }
        else {
            script = Buffer.from(prevOutScript, 'hex');
        }
        this.transaction.addInput(txHash, vout, sequence, script);
    };
    TransactionBuilder.prototype.addInputScript = function (vout, script) {
        this.tx = this.transaction.buildIncomplete();
        this.tx.setInputScript(vout, script);
        this.p2shInput = true;
    };
    TransactionBuilder.prototype.addInputScripts = function (scripts) {
        var _this = this;
        this.tx = this.transaction.buildIncomplete();
        scripts.forEach(function (script) {
            _this.tx.setInputScript(script.vout, script.script);
        });
        this.p2shInput = true;
    };
    TransactionBuilder.prototype.addOutput = function (scriptPubKey, amount) {
        try {
            this.transaction.addOutput(
            // @ts-ignore
            this._address.toLegacyAddress(scriptPubKey), amount);
        }
        catch (error) {
            this.transaction.addOutput(scriptPubKey, amount);
        }
    };
    TransactionBuilder.prototype.setLockTime = function (locktime) {
        this.transaction.setLockTime(locktime);
    };
    TransactionBuilder.prototype.sign = function (vin, keyPair, redeemScript, hashType, value) {
        if (hashType === void 0) { hashType = HashTypes.SIGHASH_ALL; }
        var witnessScript = undefined;
        this.transaction.sign(vin, keyPair, redeemScript, hashType | HashTypes.SIGHASH_BITCOINCASH_BIP143, value, witnessScript);
    };
    TransactionBuilder.prototype.build = function () {
        if (this.p2shInput === true)
            return this.tx;
        return this.transaction.build();
    };
    return TransactionBuilder;
}());
exports.TransactionBuilder = TransactionBuilder;
//# sourceMappingURL=TransactionBuilder.js.map