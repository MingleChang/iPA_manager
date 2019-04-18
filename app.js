const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const static = require('koa-static');
const koabody = require('koa-body');
const index = require('./routes/index');
const path = require('path');
const database = require('./database/index')

const app = new Koa();

//Error Handler
onerror(app);

app.use(koabody({
    multipart: true
}));

app.use(json());
app.use(logger());
app.use(static(__dirname + '/public'));
app.use(views(__dirname + '/views', {
    // extension: 'ejs',
    map: {
        html: 'ejs'
    }
}))

app.use(index.routes(), index.allowedMethods());

module.exports = app;