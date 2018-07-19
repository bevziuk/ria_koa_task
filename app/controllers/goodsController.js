const memcached = require('../managers/goodsManager');

async function getGoodsById (ctx, next) {
    try {
        ctx.body = ctx.params.id;
        ctx.status = 200;
        await next();
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        await next();
    }
}

async function postGoods (ctx, next) {
    try {
        ctx.body = ctx.request.body;
        ctx.status = 201;
        await next();
    } catch (e) {
        console.log(e);
        ctx.status = 400;
        await next();
    }

}

async function delGoodsById (ctx, next) {
    try {
        ctx.body = ctx.params.id;
        ctx.status = 204;
        await next();
    } catch (e) {
        console.log(e);
        ctx.status = 400;
        await next();
    }

}

module.exports = {getGoodsById, postGoods, delGoodsById};