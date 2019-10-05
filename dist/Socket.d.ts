import { SocketConfig } from "./interfaces/BITBOXInterfaces";
export declare class Socket {
    socket: any;
    websocketURL: string;
    bitsocketURL: string;
    constructor(config?: SocketConfig);
    listen(query: string, cb: Function): void;
    close(cb?: Function): void;
}
