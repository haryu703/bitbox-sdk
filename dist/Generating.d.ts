export declare class Generating {
    restURL: string;
    constructor(restURL?: string);
    generateToAddress(blocks: number, address: string, maxtries?: number): Promise<string[]>;
}
