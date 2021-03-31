import Koa from 'koa';
import Router from 'koa-router';
import {Blockchain} from './classes/blockchain';
import bodyParser from 'body-parser';
import morgan from 'morgan';

class BlockchainServer {

    private app: Koa;
    private router: Router;
    private blockchain: Blockchain;
    private route_port = 3000;

    constructor() {

        this.app = new Koa();
        this.router = new Router();
        this.blockchain = new Blockchain();

        this.initKoa();

        this.router.get('/', (ctx, next) => {
            // ctx.router available
            ctx.body = 'Hello World!';
        });

        this.app.use(this.router.routes())
            .use(this.router.allowedMethods());
    }

    private initKoa(): void {

        this.app.use(async () => {
            morgan("dev");
            bodyParser.urlencoded({extended:true});
            bodyParser.json()
        });
    }

    private initRouteControllers(): void {

    }

}

new BlockchainServer();


