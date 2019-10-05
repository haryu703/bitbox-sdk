import { BitDBResponse, QueryInterface } from "./interfaces/BITBOXInterfaces";
export declare class BitDB {
    bitdbURL: string;
    constructor(bitdbURL?: string);
    get(query: QueryInterface): Promise<BitDBResponse>;
}
