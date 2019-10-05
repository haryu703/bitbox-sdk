"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// imports
var bcl = require("bitcoinforksjs-lib");
var Address_1 = require("./Address");
// consts
// const bip32utils = require("bip32-utils")
var HDNode = /** @class */ (function () {
    function HDNode(address) {
        if (address === void 0) { address = new Address_1.Address(); }
        this._address = address;
    }
    HDNode.prototype.toNetwork = function (network) {
        var bitcoincash;
        if (network === "bitcoincash" || network === "mainnet")
            bitcoincash = bcl.networks.bitcoin;
        else
            bitcoincash = bcl.networks.testnet;
        return bitcoincash;
    };
    HDNode.prototype.fromSeed = function (rootSeedBuffer, network) {
        if (network === void 0) { network = "mainnet"; }
        return bcl.bip32.fromSeed(rootSeedBuffer, this.toNetwork(network));
    };
    HDNode.prototype.toLegacyAddress = function (hdNode) {
        var address = bcl.payments.p2pkh({ pubkey: hdNode.publicKey }).address;
        if (!address) {
            throw new Error("failed to convert hdnode to legacy address " + hdNode);
        }
        return address;
    };
    HDNode.prototype.toCashAddress = function (hdNode, regtest) {
        if (regtest === void 0) { regtest = false; }
        return this._address.toCashAddress(this.toLegacyAddress(hdNode), true, regtest);
    };
    HDNode.prototype.toWIF = function (hdNode) {
        return hdNode.toWIF();
    };
    HDNode.prototype.toXPub = function (hdNode) {
        return hdNode.neutered().toBase58();
    };
    HDNode.prototype.toXPriv = function (hdNode) {
        return hdNode.toBase58();
    };
    HDNode.prototype.toKeyPair = function (hdNode) {
        var network = hdNode.network.wif === bcl.networks.bitcoin.wif ? bcl.networks.bitcoin : bcl.networks.testnet;
        return bcl.ECPair.fromWIF(hdNode.toWIF(), network);
    };
    HDNode.prototype.toPublicKey = function (hdNode) {
        return hdNode.publicKey;
    };
    HDNode.prototype.fromXPriv = function (xpriv) {
        var bitcoincash;
        if (xpriv[0] === "x")
            bitcoincash = bcl.networks.bitcoin;
        else
            bitcoincash = bcl.networks.testnet;
        return bcl.bip32.fromBase58(xpriv, bitcoincash);
    };
    HDNode.prototype.fromXPub = function (xpub) {
        var bitcoincash;
        if (xpub[0] === "x")
            bitcoincash = bcl.networks.bitcoin;
        else
            bitcoincash = bcl.networks.testnet;
        return bcl.bip32.fromBase58(xpub, bitcoincash);
    };
    HDNode.prototype.derivePath = function (hdnode, path) {
        return hdnode.derivePath(path);
    };
    HDNode.prototype.derive = function (hdnode, path) {
        return hdnode.derive(path);
    };
    HDNode.prototype.deriveHardened = function (hdnode, path) {
        return hdnode.deriveHardened(path);
    };
    HDNode.prototype.sign = function (hdnode, buffer) {
        return hdnode.sign(buffer);
    };
    HDNode.prototype.verify = function (hdnode, buffer, signature) {
        return hdnode.verify(buffer, signature);
    };
    HDNode.prototype.isPublic = function (hdnode) {
        return hdnode.isNeutered();
    };
    HDNode.prototype.isPrivate = function (hdnode) {
        return !hdnode.isNeutered();
    };
    HDNode.prototype.toIdentifier = function (hdnode) {
        return hdnode.identifier;
    };
    HDNode.prototype.fromBase58 = function (base58, network) {
        return bcl.bip32.fromBase58(base58, this.toNetwork(network));
    };
    return HDNode;
}());
exports.HDNode = HDNode;
//# sourceMappingURL=HDNode.js.map