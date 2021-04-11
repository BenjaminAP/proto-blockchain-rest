import * as elliptic from 'elliptic';

const bip39 = require('bip39');

export class Wallet {

    private ec: any;

    constructor() {
        this.ec = new elliptic.eddsa('ed25519');
    }

    public generateMnemonic(): Promise<string> {

        return new Promise<string>(async (resolve, reject) => {
            resolve(bip39.generateMnemonic());
        });
    }

    public verify(msg: string, pubAddress: string, signature: string): Promise<boolean> {

        return new Promise<boolean>(async (resolve, reject) => {
            const key = this.ec.keyFromPublic(pubAddress, 'hex');
            resolve(key.verify(msg, signature));
        });
    }
}


/// TODO: yarn install elliptic
/// llok for mnemonic generator = bip39

