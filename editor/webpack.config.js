const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const DEBUG = !process.argv.includes('--release')

const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG
}

const appConfig = {
    https: true,
    cache: true,
    debug: true,
    entry: [
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client?overlay=false&reload=true',
        path.join(__dirname, 'app/main.js')
    ],
    output: {
        publicPath: '/',
        sourcePrefix: '  ',
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        library: "GGFactory",
        libraryTarget: "umd"
    },
    externals: {
        "three": "THREE"
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        
        loaders: [
            {test: /\.js?$/,  include: path.join(__dirname, 'app'), loader: 'babel'},
            {test: /\.json$/, include: path.join(__dirname, 'app'), loader: 'json'}
        ]
    }
}

module.exports = appConfig