var PORT = 8081;
var path = require('path');
var webpack = require('webpack');
var assetPath = '/assets/';
var absolutePath = path.join(__dirname, 'build', assetPath);
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
		plugins: [
			new ExtractTextPlugin({
				filename: 'bundle.css',
				allChunks: true,
			})
		],
		module: {
			rules: [{
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
			}, {
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
				use: [{
					loader: 'file-loader',
					options: {
						name: 'resources/[name].[ext]',
					}
				}],
			}, {
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}, {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1
						}
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}]
				})
			}]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		devServer: {
			historyApiFallback: true,
			contentBase: './public',
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