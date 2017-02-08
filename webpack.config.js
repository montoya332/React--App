var PORT = 8081;
var path = require('path');
var webpack = require('webpack');
var assetPath = '/assets/';
var absolutePath = path.join(__dirname, 'build', assetPath);

module.exports = (env, argv) => {
    return {
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
        plugins: [],
        module: {
            rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'react-hot-loader'
                }, {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', 'stage-1']
                    }
                }]
            }]
        },
        resolve: {
            extensions: [ '.js', '.jsx']
        },
        devServer: {
            historyApiFallback: true,
            contentBase:  './',
            port: argv.port || 8081,
            hot: true,
            stats: {
                cached: false,
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                modules: false,
                reasons: true,
                source: true,
                errors: true,
                errorDetails: true,
                warnings: true,
            }
        }
    }
};