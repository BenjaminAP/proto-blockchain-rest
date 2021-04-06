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
        this.router.get('/block/height/:height', (ctx, next) => {
            ctx.body = ctx.params.height;
        })
    }


    private requestMessageOwnershipVerification(): void {
        this.router.get('/signature/request/:pubAddress', async (ctx, next) => {
            const public_address = ctx.params.pubAddress;
            ctx.body = await this.blockchain.requestMessageOwnershipVerification(public_address);
        });
    }

}
