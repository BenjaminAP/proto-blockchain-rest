
const EdDSA = require('elliptic').eddsa

const ec = new EdDSA('ed25519');

let mnemonic = 'something strange in my room'/// generate with bip39;

const key = ec.keyFromSecret(Buffer.from(JSON.stringify(mnemonic), 'hex'));

console.log(key);

const  bitcointLib = require('bitcoinjs-lib');

export class Wallet {
        
        constructor() {
        
        }
}


/// TODO: yarn install elliptic
/// llok for mnemonic generator = bip39

