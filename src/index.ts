import Koa from 'koa';
import Router from 'koa-router';
import {Blockchain} from './classes/blockchain';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import {Blockchain_Router} from "./routes/blockchain_router";
import {Wallet_Router} from "./routes/wallet_router";

const cors = require('@koa/cors');

class BlockchainServer {

    private app: Koa;
    private router: Router;
    private blockchain: Blockchain;
    private route_port = 3000;
    /// Kill port in use windows cmd: netstat -ano|findstr "PID :3000"
    /// taskkill /pid {PID} /f

    constructor() {

        this.app = new Koa();
        this.app.use(cors());

        this.router = new Router();
        this.blockchain = new Blockchain();

        this.router.get('/', (ctx, next) => {
            // ctx.router available
            ctx.body = 'Hello World!';
        });

        this.app.use(this.router.routes())
            .use(this.router.allowedMethods());

        this.initRouteControllers();
        this.initKoa();
    }

    private initKoa(): void {

        this.app.use(async () => {
            morgan("dev");
            bodyParser.urlencoded({extended:true});
            bodyParser.json()
        });

        this.app.listen(this.route_port, () => {console.log(`http://localhost:${this.route_port}`)});
    }

    private initRouteControllers(): void {
        new Blockchain_Router(this.app, this.router, this.blockchain);
        new Wallet_Router(this.app, this.router);
    }

}

new BlockchainServer();


