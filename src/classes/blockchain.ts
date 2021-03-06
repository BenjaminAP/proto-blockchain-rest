import {Block, BlockData} from './block';
import {Wallet} from './wallet';

const SHA256 = require('crypto-js/sha256');
const bitcoinMessage = require('bitcoinjs-message');

// const SHA256  = require('crypto-js/sha256');

export interface Star {
    dec: string;
    ra: string;
    story: string;
}

export class Blockchain {
    private chain: Block[];
    private height: number;
    private walletMsg: Wallet;


    constructor() {
        this.chain = [];
        this.height = -1;
        this.walletMsg = new Wallet();

        try {
            this.initChain();
        } catch (err) {
            console.log(err);
        }
    }

    private initChain(): Promise<Block> {

        return new Promise<Block>(async (res, rej) => {
            if (this.height === -1) {
                const block = await this.createGenesisBlock();
                res(this.addBlock(block));
            }
        });
    }

    private createGenesisBlock(): Promise<Block> {
        return new Promise<Block>(async (resolve, reject) => {
            resolve(new Block('Genesis Block'));
        });
    }

    public getChainHeight(): number {
        return this.height;
    }

    private hashBlock(block: Block): string {
        return SHA256(JSON.stringify(block)).toString();
    }

    private setTimeStamp(): string {
        return new Date().getTime().toString().slice(0, -3);
    }

    private addBlock(newBlock: Block): Promise<Block> {

        return new Promise(async (res, rej) => {
            newBlock.height = this.getChainHeight();
            newBlock.height++;
            newBlock.timeStamp = this.setTimeStamp(); /// UTC t.s

            if (this.chain.length > 0) {
                newBlock.prevBlockHash = this.chain[newBlock.height - 1].hash;
            }

            newBlock.hash = this.hashBlock(newBlock);


            /// validate chain before adding new block && validate block
            if (!await this.validateChain()) {
                rej('Invalid Chain');
            } else if (!await newBlock.validate()) {
                rej('Invalid Block');
            }

            this.chain.push(newBlock);
            this.height++;
            console.log(newBlock);

            res(newBlock);
        });
    }

    public requestMessageOwnershipVerification(address: string): Promise<string> {
        return new Promise(async (res) => {
            res(`${address}:${new Date().getTime().toString().slice(0, -3)}:starRegistry`);
        });
    }

    public submitStar(address: string, message: string, signature: string, star: Star): Promise<Block | string> {
        return new Promise(async (res, rej) => {

            /// [0]: address; [1]: time; [2]: starRegistry
            const sentMsgTime = parseInt(message.split(':')[1]);
            const currentTime = parseInt(new Date().getTime().toString().slice(0, -3));

            if ((currentTime - sentMsgTime) < 300 && await this.walletMsg.verify(message, address, signature)) {
                const data: BlockData = {
                    star: star,
                    message: message,
                    address: address,
                    signature: signature
                }
                const newBlock = new Block(data);

                res(await this.addBlock(newBlock));
            } else {
                res(`Message ${message} took to long from you side to sumbit. Request another msg and try again`);
                rej(`Message ${message} took to long from you side to sumbit. Request another msg and try again`);
            }
        });
    }

    public getBlockByHash(hash: string): Promise<Block[]> {
        return new Promise(async (res, rej) => {
            const blocksFound = this.chain.filter((block: Block) => {
                return block.hash === hash;
            });

            res(blocksFound);
        });
    }

    private getBlockByHeight(height: number): Promise<Block | null> {
        return new Promise((resolve, reject) => {
            const block = this.chain.filter(p => p.height === height)[0];
            if (block) {
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    public getStarsByWalletAddress(address: string): Promise<Star[]> {
        return new Promise(async (res, rej) => {
            const starsFound: Star[] = [];

            this.chain.filter(async (block: Block) => {
                const blockData: BlockData = await block.getBlockData();

                if (blockData.address === address) {
                    starsFound.push(blockData.star);
                }
            });

            res(starsFound);
        });
    }

    private validateChain(): Promise<boolean> {
        const errorLog = [];
        return new Promise(async (resolve, reject) => {

            let prevHash = this.chain[0].hash;

            for (let index = 1; index < this.chain.length - 1; index++) {

                if (this.chain[index].prevBlockHash !== prevHash) {
                    return false
                }

                prevHash = this.chain[index].prevBlockHash;
            }

            return true;
        });
    }
}
