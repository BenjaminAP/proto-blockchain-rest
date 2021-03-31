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

  private async initChain(): Promise<void> {
    if (this.height === -1) {
      const block = this.createGenesisBlock();
      await this.addBlock(block);
    }
  }

  private createGenesisBlock(): Block {
    return new Block('Genesis Block');
  }

  private getPrevBlockHash(): string {
    return <string> this.chain[this.chain.length - 1].hash;
  }

  private getChainHeight(): number {
    return this.chain.length;
  }

  private hashBlock(block: Block): string {
    return SHA256(JSON.stringify(block)).toString();
  }

  private setTimeStamp(): string {
    return new Date().getTime().toString().slice(0, -3);
  }

  private addBlock(newBlock: Block): Promise<unknown> {

    return new Promise((res, rej) => {
      newBlock.height = this.getChainHeight();
      newBlock.timeStamp = this.setTimeStamp(); /// UTC t.s

      if (this.chain.length > 0) {
        newBlock.prevBlockHash = this.getPrevBlockHash();
      }

      newBlock.hash = this.hashBlock(newBlock);

      this.chain.push(newBlock);
    });
  }

  private requestMessageOwnershipVerification(address: string): Promise<void> {
    return new Promise((resolve) => {

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
