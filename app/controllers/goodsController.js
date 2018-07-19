const memcached = require('../managers/goodsManager');

async function getGoodsById (ctx, next) {
    try {
        const data = await memcached.getItemById(ctx.params.id);
        if(data === undefined)
            ctx.throw(404, 'Not found');
        else {
            ctx.status = 200;
            ctx.body = data;
        }
        await next();
    }
    catch (err) {
        console.log(err);
        ctx.throw(404, 'Not found');
        await next();
    }
}

async function postGoods (ctx, next) {
    try {
        ctx.body = await memcached.addItem(ctx.request.body);;
        ctx.status = 201;
        await next();
    } catch (err) {
        console.log(err);
        ctx.throw(400, 'Not found');
        await next();
    }
}

async function delGoodsById (ctx, next) {
    try {
        await memcached.deleteItemById(ctx.params.id);
        ctx.status = 204;
        await next();
    } catch (err) {
        console.log(err);
        ctx.throw(400, 'Not found');
        await next();
    }
}

module.exports = {getGoodsById, postGoods, delGoodsById};