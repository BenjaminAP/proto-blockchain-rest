import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    // ctx.router available
    ctx.body = 'Hello World!';
});

app.use(router.routes())
    .use(router.allowedMethods());

const route_port = 3000;

app.listen(3000, () => {console.log(`http://localhost:${route_port}/`)});
