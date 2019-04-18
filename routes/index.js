const Router = require('koa-router');
const Utils = require('../utils/utils');
const config = require('../utils/config');
const path = require('path');
const fs = require('fs');
const router = Router();

router.get('/', async(ctx, next) => {
    const ipas = await Utils.selectIpaGroup();
    await ctx.render('index', {ipas: ipas});
    await next();
});
router.get('/list', async(ctx, next) => {
    const bundleId = ctx.request.query.bundleId;
    const ipas = await Utils.selectIpaBundleId(bundleId);

    const baseUrl = Utils.httpsBaseUrl();
    const manifestUrl = baseUrl + '/plist/';
    await ctx.render('list',{bundleId: bundleId, manifestUrl: manifestUrl, ipas: ipas});
    await next();
});
router.get('/upload', async(ctx, next) => {
    await ctx.render('upload', {message: '上传'});
    await next();
});
router.get('/plist/:id', async(ctx, next) => {
    const ipaId = ctx.params.id;
    const ipaFile = await Utils.selectIpaById(ipaId);
    const plist = Utils.getManifestPlistWithIpa(ipaFile);
    ctx.response.set('Content-Type','application/octet-stream');
    ctx.body = plist;
});
router.post('/upload', async(ctx, next) => {
    const file = ctx.request.files.file;
    const info = await Utils.saveIpaFile(file);
    await Utils.saveInfo(info);
    ctx.body = info;
});

module.exports = router;