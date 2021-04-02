import {Blockchain} from "../classes/blockchain";
import Router from "koa-router";
import Koa from "koa";

class BlockchainServer {
}

export class Blockchain_Router {

    private server: Koa;
    private blockchain: Blockchain;
    private router: Router;

    constructor(server: Koa, blockchainObj: Blockchain) {
        this.server = server;
        this.blockchain = blockchainObj;
        this.router = new Router();

        this.router.get('/blockchain', (ctx, next) => {
            // ctx.router available
            ctx.body = 'Hello Blockchain!';
        });

        this.server.use(this.router.routes())
            .use(this.router.allowedMethods());
    }



}
