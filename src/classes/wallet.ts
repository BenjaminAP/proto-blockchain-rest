
const EdDSA = require('elliptic').eddsa

const ec = new EdDSA('ed25519');

const bip39 = require('bip39');

const mnemonic = bip39.generateMnemonic();

const key = ec.keyFromSecret(Buffer.from(JSON.stringify(mnemonic), 'hex'));

// console.log(key);

// console.log(mnemonic);

const  bitcointLib = require('bitcoinjs-lib');

export class Wallet {
        
        constructor() {
        
        }

        public generateMnemonic(): string {
                return bip39.generateMnemonic();
        }
}


/// TODO: yarn install elliptic
/// llok for mnemonic generator = bip39

