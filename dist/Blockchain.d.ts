import { BlockchainInfoResult, BlockDetailsResult, BlockHeaderResult, ChainTipResult, MempoolEntryResult, MempoolInfoResult, TxOutResult } from "bitcoin-com-rest";
export declare class Blockchain {
    restURL: string;
    constructor(restURL?: string);
    getBestBlockHash(): Promise<string>;
    getBlock(blockhash: string, verbose?: boolean): Promise<BlockDetailsResult>;
    getBlockchainInfo(): Promise<BlockchainInfoResult>;
    getBlockCount(): Promise<number>;
    getBlockHash(height?: number): Promise<string>;
    getBlockHeader(hash: string | string[], verbose?: boolean): Promise<BlockHeaderResult | BlockHeaderResult[]>;
    getChainTips(): Promise<ChainTipResult[]>;
    getDifficulty(): Promise<number>;
    getMempoolAncestors(txid: string, verbose?: boolean): Promise<string[] | MempoolEntryResult[]>;
    getMempoolDescendants(txid: string, verbose?: boolean): Promise<string[] | MempoolEntryResult[]>;
    getMempoolEntry(txid: string | string[]): Promise<MempoolEntryResult>;
    getMempoolInfo(): Promise<MempoolInfoResult>;
    getRawMempool(verbose?: boolean): Promise<string[]>;
    getTxOut(txid: string, n: any, include_mempool?: boolean): Promise<TxOutResult | null>;
    getTxOutProof(txids: string | string[]): Promise<string | string[]>;
    preciousBlock(blockhash: string): Promise<any>;
    pruneBlockchain(height: number): Promise<number>;
    verifyChain(checklevel?: number, nblocks?: number): Promise<boolean>;
    verifyTxOutProof(proof: string | string[]): Promise<string[]>;
}
