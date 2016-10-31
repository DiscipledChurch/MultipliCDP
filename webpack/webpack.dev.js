var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpack = require('html-webpack-plugin');

var rootDir = path.resolve(__dirname, '..');

module.exports = {

    entry: {
        app: [ path.resolve(rootDir, 'public', 'main') ]//,
        //vendor: [ path.resolve(rootDir, 'src', 'vendor') ]
    },
    module: {
        preLoaders: [
            { exclude: /node_modules/, loader: 'tslint', test: /\.ts$/ }
        ],
        loaders: [
            { loader: 'raw', test: /\.(css|html)$/ },
            { exclude: /node_modules/, loader: 'ts?logLevel=warn', test: /\.ts$/ }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'dist')
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('.', 'public')
    },
    tslint: {
        emitErrors: true
    },
    plugins: [
        /*new ChunkWebpack({
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
            name: 'vendor'
        }),*/
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'public', 'index.html')
        })
    ],
}