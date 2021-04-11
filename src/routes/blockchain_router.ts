import {Blockchain} from "../classes/blockchain";
import Router from "koa-router";
import Koa from "koa";
import {rejects} from "assert";

const bitcoinMessage = require('bitcoinjs-message');

interface Data {
    address: string;
    message: string;
    signature: string;
    star: {
        dec: string,
        ra: string,
        story: string
    };
}

export class Blockchain_Router {

    private server: Koa;
    private blockchain: Blockchain;
    private router: Router;

    constructor(server: Koa, app_router: Router, blockchainObj: Blockchain) {
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
        // this.getBlockByHeight();
        this.getStarByOwner();
        this.submitStar();
        this.getBlockByHash();
        this.requestMessageOwnershipVerification();

        this.server.use(this.router.routes())
            .use(this.router.allowedMethods());
    }

    private getChainHeight(): void {
        this.router.get('/chain/height', async (ctx, next) => {

            try {
                ctx.body = await this.blockchain.getChainHeight();
            } catch (err) {
                console.log(err);
            }
        })
    }

    private requestMessageOwnershipVerification(): void {
        this.router.get('/signature/request/:pubAddress', async (ctx, next) => {

            try {
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
            } catch (err) {

                console.log(err);
                ctx.throw(500, err);
            }


        });
    }

    private submitStar(): void {
        this.router.post('/submitStar', async (ctx, next) => {

            try {

                if (ctx.request.body) {
                    const dataToSubmit: Data = ctx.request.body

                    const starSubmited = await this.blockchain
                        .submitStar(
                            dataToSubmit.address,
                            dataToSubmit.message,
                            dataToSubmit.signature,
                            dataToSubmit.star);

                    if (starSubmited) {
                        ctx.body = starSubmited;
                    } else {
                        ctx.throw(500, 'Something went wrong submitting star');
                    }

                } else {
                    ctx.throw(500, 'Check the body parameter');
                }

            } catch (err) {
                console.log(err);
                ctx.throw(500, err);
            }
        });
    }

    private getBlockByHash() {
        this.router.get('/block/hash/:hash', async (ctx, next) => {

            try {
                if (ctx.params.hash) {
                    console.log(ctx.params.hash);
                    const blockFound = await this.blockchain.getBlockByHash(ctx.params.hash);

                    if (blockFound) {
                        ctx.body = blockFound;
                    } else {
                        ctx.throw(500, "An error happened");
                    }

                } else {
                    ctx.throw(500, "Hash not provided in route");
                }
            } catch (err) {
                console.log(err);
                ctx.throw(500, "An Error Happened");
            }
        })
    }

    private getStarByOwner() {
        this.router.get('/star/owner/:address', async (ctx, next) => {

            try {

                if (ctx.params.address) {
                    const starsFound = await this.blockchain.getStarsByWalletAddress(ctx.params.address);

                    if (starsFound) {
                        ctx.body = starsFound;
                    } else {
                        ctx.throw(500, "An error Happened");
                    }

                } else {
                    ctx.throw(500, "Address not provided");
                }

            } catch (err) {
                console.log(err);
                ctx.throw(500, "An error Happened");
            }
        });
    }


    // private getBlockByHeight(): void {
    //     this.router.get('/block/height/:height', async (ctx, next) => {
    //         ctx.body = ctx.params.height;
    //     })
    // }

}
