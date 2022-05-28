const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {

    await ctx.render('index', {
        oauthToken: process.env.TWITCH_OAUTH_TOKEN
    });
});

module.exports = router;