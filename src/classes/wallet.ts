import * as elliptic from 'elliptic';

const bip39 = require('bip39');

export class Wallet {
        
        private ec: any;
        
        constructor() {
                this.ec = new elliptic.eddsa('ed25519');
        }

        public generateMnemonic(): string {
                return bip39.generateMnemonic();
        }
        
        public verify(msg: string, pubAddress: string, signature: string): boolean {
                const key = this.ec.keyFromPublic(pubAddress, 'hex');
                console.log(key.verify(msg, signature));
                return key.verify(msg, signature);
        }
}


/// TODO: yarn install elliptic
/// llok for mnemonic generator = bip39

