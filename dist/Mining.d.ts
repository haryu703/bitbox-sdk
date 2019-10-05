export declare class Mining {
    restURL: string;
    constructor(restURL?: string);
    getBlockTemplate(template_request: any): Promise<any>;
    getMiningInfo(): Promise<any>;
    getNetworkHashps(nblocks?: number, height?: number): Promise<number>;
    submitBlock(hex: string, parameters: any): Promise<any>;
}
