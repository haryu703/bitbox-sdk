import { NodeInfoResult } from "bitcoin-com-rest";
export declare class Control {
    restURL: string;
    constructor(restURL?: string);
    getInfo(): Promise<NodeInfoResult>;
    getNetworkInfo(): Promise<any>;
}
