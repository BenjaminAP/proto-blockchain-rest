import Koa from 'koa';
import Router from 'koa-router';
import {Blockchain} from './classes/blockchain';

class BlockchainServer {

    private app: Koa;
    private router: Router;
    // private blockchain: Blockchain;

    constructor() {
        this.app = new Koa();
        this.router = new Router();
        // this.blockchain = new Blockchain();

        this.router.get('/', (ctx, next) => {
            // ctx.router available
            ctx.body = 'Hello World!';
        });

        this.app.use(this.router.routes())
            .use(this.router.allowedMethods());

        const route_port = 3000;

        this.app.listen(3000, () => {console.log(`http://localhost:${route_port}/`)});
    }

}

new BlockchainServer();


