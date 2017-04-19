#!/usr/bin/env node

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config=require('../config-factory/normal')({
    projectPath:path.join(__dirname,'../../'),
    appName:'tree-demo'
},'develop');

var app = express();
var compiler = webpack(config.webpackConfig);
app.use(require('webpack-dev-middleware')(compiler,{
    quiet:true,
    noInfo:true,
    reload:true,
    stats:{colors:true}
}));
app.use(require('webpack-hot-middleware')(compiler,{
    log:console.log
}));
app.use('/external', express.static(path.join(config.appSrcPath,'external')));
app.get('*', function(req,res){
    res.sendFile(path.join(config.appSrcPath,'internal/index.html'));
});
app.listen(8080,function(err) {
    if (err) {
        return;
    }
    console.log('Listening at http://localhost:8080');
});
