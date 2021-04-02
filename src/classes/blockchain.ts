import {Block} from './block';
const SHA256 = require('crypto-js/sha256');
const  bitcoinMessage = require('bitcoinjs-message');

// const SHA256  = require('crypto-js/sha256');

export class Blockchain {
  private chain: Block[];
  private height: number;


  constructor() {
    this.chain = [];
    this.height = -1;

    this.initChain();
  }

  private initChain(): Promise<Block> {

    return new Promise<Block>((res, rej) => {
      if (this.height === -1) {
        const block = this.createGenesisBlock();
        res(this.addBlock(block));
      }
    });
  }

  private createGenesisBlock(): Block {
    return new Block('Genesis Block');
  }

  private getPrevBlockHash(): string {
    return <string> this.chain[this.getChainHeight()].hash;
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

    return new Promise( (res, rej) => {
      newBlock.height = this.getChainHeight();
      newBlock.height++;
      newBlock.timeStamp = this.setTimeStamp(); /// UTC t.s

      if (this.chain.length > 0) {
        newBlock.prevBlockHash = this.getPrevBlockHash();
      }

      newBlock.hash = this.hashBlock(newBlock);

      /// Make sure block is no tempered with before adding to chain
      if (!newBlock.validate()) {
        console.log('Invalid BLock', newBlock);
        rej('Block as been tempered with');
      }
      
      console.log(newBlock.getBlockData());

      this.chain.push(newBlock);

      res(newBlock);
    });
  }

  private requestMessageOwnershipVerification(address: string): Promise<string> {
    return new Promise((res) => {
      res(`${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`)
    });
  }

  private submitStar(address: string, message: string, signature: string, star: any): Promise<void> {
    return new Promise(async (resolve, reject) => {

    });
  }

  private getBlockByHash(hash: string): Promise<void> {
    return new Promise((resolve, reject) => {

    });
  }

  private getBlockByHeight(height: number): Promise<Block | null> {
    return new Promise((resolve, reject) => {
      const block = this.chain.filter(p => p.height === height)[0];
      if (block){
        resolve(block);
      } else {
        resolve(null);
      }
    });
  }

  private getStarsByWalletAddress(address: string): Promise<void> {
    const stars = [];
    return new Promise((resolve, reject) => {

    });
  }

  private validateChain(): Promise<void> {
    const errorLog = [];
    return new Promise(async (resolve, reject) => {

    });
  }
}
