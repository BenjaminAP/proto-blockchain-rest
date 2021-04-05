import Router from "koa-router";
import Koa from "koa";
import {Blockchain} from "../classes/blockchain";
import {Wallet} from "../classes/wallet";

export class Wallet_Router {

    private server: Koa;
    private router: Router;

    constructor(server: Koa) {

        this.server = server;
        this.router = new Router();

        this.router.get('/wallet', (ctx, next) => {
            // ctx.router available
            ctx.body = 'Hello Wallet!';
        });

        this.initRoutes();
    }

    private initRoutes() {
        this.generateMnemonic()

        this.server.use(this.router.routes())
            .use(this.router.allowedMethods());
    }

    private generateMnemonic() {
        const wallet = new Wallet();

        this.router.get('/wallet/new/mnemonic', async (ctx, next) => {
            // ctx.router available
            ctx.body = wallet.generateMnemonic();
        });
    }

}
