import { BlockDetailsResult } from "bitcoin-com-rest";
export declare class Block {
    restURL: string;
    constructor(restURL?: string);
    detailsByHeight(id: number | number[]): Promise<BlockDetailsResult | BlockDetailsResult[]>;
    detailsByHash(hash: string | string[]): Promise<BlockDetailsResult | BlockDetailsResult[]>;
}
