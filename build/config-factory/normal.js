#!/usr/bin/env node

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer=require('autoprefixer');

module.exports=function(conf,context){
    var config={
        appName:conf.appName,
        projectPath:conf.projectPath,
    };
    config.appSrcPath=path.join(config.projectPath,'src/app/'+config.appName);
    config.appDistPath=path.join(config.projectPath,'dist/'+config.appName);

    var webpackConfig={
        entry:[
            path.join(config.appSrcPath,'internal/view/index.js'),
        ],
        output:{
            path:config.appDistPath,
            filename:'[name].[hash:8].js',
        },
        plugins:[
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':JSON.stringify('production')
            }),
            new HtmlWebpackPlugin({
                "filename":'index.html',
                "template":path.join(config.appSrcPath,'internal/index.html'),
                "inject":true,
                "hash":true,
                "externalPath":"external"
            })
        ],
        resolve:{
            alias:{
                'action': path.join(config.appSrcPath,'internal/action/index.js'),
                'reducer': path.join(config.appSrcPath,'internal/reducer/index.js'),
                'store': path.join(config.appSrcPath,'internal/store/index.js'),
                'api': path.join(config.appSrcPath,'internal/api/index.js'),
                'method': path.join(config.appSrcPath,'internal/method/index.js'),
                'config':path.join(config.appSrcPath,'internal/config/index.js'),
                'pc-comp': path.join(config.projectPath,'src/common/component/pc/index.js'),
                'mobile-comp': path.join(config.projectPath,'src/common/component/mobile/index.js'),
                'high': path.join(config.projectPath,'src/common/high/index.js'),
                '_react': path.join(config.projectPath,'src/common/react/index.js'),
                'util': path.join(config.projectPath,'src/common/util/index.js')
            }
        },
        module:{
            loaders:[
                {
                    test: /\.css/,
                    loader: 'style!css'
                },
                {
                    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                    loader: 'url-loader?limit=50000&name=[path][name].[ext]'
                },
                {
                    test: /\.less$/,
                    loader: 'style!css?modules&importLoaders=2!postcss-loader!less?outputStyle=expanded'
                },
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                }
            ]
        },
        postcss:function(){
            return [autoprefixer({browsers:['> 1%','IE 8']})];
        }
    };
    if(context=='release'){
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:false
            }
        }));
    }
    else if(context=='develop'){
        webpackConfig.entry.push('webpack-hot-middleware/client');
        webpackConfig.entry.push('webpack/hot/dev-server');
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    config.webpackConfig=webpackConfig;
    return config;
};
