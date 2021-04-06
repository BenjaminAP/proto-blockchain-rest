
const bip39 = require('bip39');

export class Wallet {
        
        constructor() {
        
        }

        public generateMnemonic(): string {
                return bip39.generateMnemonic();
        }
}


/// TODO: yarn install elliptic
/// llok for mnemonic generator = bip39

