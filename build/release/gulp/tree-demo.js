#!/usr/bin/env node
var gulp=require('gulp'),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    gulpWebpack = require('gulp-webpack'),
    gulpSequence = require('gulp-sequence');
var path=require('path');

var config=require('../../config-factory/normal')({
    projectPath:path.join(__dirname,'../../../'),
    appName:'tree-demo'
},'release');

function n(str){
    return config.appName+'-'+str;
}
gulp.task(n('clean'),function(cb){
    rimraf(config.appDistPath,cb);
});
gulp.task(n('external'),function(){
    return gulp.src([path.join(config.appSrcPath,'external/**/*')])
        .pipe(gulp.dest(path.join(config.appDistPath,'external/')));
});
gulp.task(n('internal'),function(){
    return gulp.src([path.join(config.appSrcPath,'internal/view/index.js')])
        .pipe(gulpWebpack(config.webpackConfig))
        .pipe(gulp.dest(config.appDistPath))
});
gulp.task(n('release'), gulpSequence(n('clean'),n('external'),n('internal')));


