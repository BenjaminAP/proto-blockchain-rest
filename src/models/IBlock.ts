export interface IBlock {
    hash: string | null;
    height: number;
    body: string;
    timeStamp: string;
    prevBlockHash: string | null;
}
