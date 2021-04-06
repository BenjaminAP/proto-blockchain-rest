import {Blockchain} from "../classes/blockchain";
import Router from "koa-router";
import Koa from "koa";

class BlockchainServer {
}

export class Blockchain_Router {

    private server: Koa;
    private blockchain: Blockchain;
    private router: Router;

    constructor(server: Koa, app_router:Router, blockchainObj: Blockchain) {
        this.server = server;
        this.blockchain = blockchainObj;
        this.router = app_router;

        this.router.get('/blockchain', (ctx, next) => {
            // ctx.router available
            ctx.body = 'Hello Blockchain!';
        });

        this.initRoutes();

    }

    private initRoutes(): void {

        this.getChainHeight();
        this.getBlockByHeight();
        this.getStarByOwner();
        this.submitStar();
        this.getBlockByHash();
        this.requestMessageOwnershipVerification();

        this.server.use(this.router.routes())
            .use(this.router.allowedMethods());
    }

    private getChainHeight(): void {
        this.router.get('/chain/height', async (ctx, next) => {
            ctx.body = await this.blockchain.getChainHeight();
        })
    }

    private getBlockByHeight(): void {
        this.router.get('/block/height/:height', async (ctx, next) => {
            ctx.body = ctx.params.height;
        })
    }


    private requestMessageOwnershipVerification(): void {
        this.router.get('/signature/request/:pubAddress', async (ctx, next) => {
            
            console.log('something to show');
            
            if (ctx.params.pubAddress) {
                const public_address = ctx.params.pubAddress;
                const msg = await this.blockchain.requestMessageOwnershipVerification(public_address);
                
                if (msg) {
                    ctx.body = msg;
                } else {
                    ctx.throw(500, 'An error happened!');
                }
                
            } else {
                ctx.throw(500, 'Check the body parameter');
            }
            
        });
    }
    
    private submitStar(): void {
        this.router.post('/submitStar', async (ctx, next) => {
            console.log('params', ctx.params);
        });
    }
    
    private getBlockByHash() {
    
    }
    
    private getStarByOwner() {
    
    }

}
