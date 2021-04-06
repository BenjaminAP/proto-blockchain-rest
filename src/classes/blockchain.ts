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

      // /// Make sure block is no tempered with before adding to chain
      // if (!newBlock.validate()) {
      //   console.log('Invalid BLock', newBlock);
      //   rej('Block as been tempered with');
      // }

      this.chain.push(newBlock);

      res(newBlock);
    });
  }

  public requestMessageOwnershipVerification(address: string): Promise<string> {
    return new Promise(async (res) => {
      res(`${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`);
    });
  }

  private submitStar(address: string, message: string, signature: string, star: any): Promise<Block> {
    return new Promise(async (res, rej) => {
  
      /// [0]: address; [1]: time; [2]: starRegistry
      const sentMsgTime = parseInt(message.split(':')[1]);
      const currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
      
      console.log(sentMsgTime - currentTime);
      
      if (sentMsgTime - currentTime < 60*5 && bitcoinMessage.verify(message, address, signature)) {
        const newBlock = new Block(star);
        
        res(this.addBlock(newBlock));
      }
    });
  }

  private getBlockByHash(hash: string): Promise<Block[]> {
    return new Promise((res, rej) => {
      const blockFound = this.chain.filter((block: Block) => {
        return block.hash === hash;
      });
      
      res(blockFound);
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
    return new Promise((res, rej) => {

    });
  }

  private validateChain(): Promise<void> {
    const errorLog = [];
    return new Promise(async (resolve, reject) => {

    });
  }
}
