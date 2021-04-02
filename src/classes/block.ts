import {IBlock} from '../models/IBlock';

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

export class Block {
  hash: string | null;
  height: number;
  body: string;
  timeStamp: string;
  prevBlockHash: string;

  constructor(data: any) {
    this.hash = null;
    this.height = 0;
    this.body = Buffer.from(JSON.stringify({'data': data})).toString('hex');
    this.timeStamp = '';
    this.prevBlockHash = '0x';
  }

  public validate(): Promise<boolean> {

    return new Promise<boolean>((res, rej) => {

      const blockToVerify: IBlock = {
        hash: null,
        height: this.height,
        body: this.body,
        timeStamp: this.timeStamp,
        prevBlockHash: this.prevBlockHash,
      }
      
      if (this.hash === SHA256(JSON.stringify(blockToVerify)).toString()){
        res(true);
      } else {
        rej(Error("Not a Valid Block"));
      }

    })

  }

  public getBlockData(): Promise<{ data: any }> {

    return new Promise<{data: any}>((res, rej) => {
      res(JSON.parse(hex2ascii(this.body)));
    });
  }
}
