var PORT = 8081;
var path = require('path');
var webpack = require('webpack');
var assetPath = '/assets/';
var absolutePath = path.join(__dirname, 'build', assetPath);

module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: absolutePath,
        publicPath: assetPath,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
    module: {
        loaders: [{
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        port: 8081
    }
};