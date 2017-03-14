/*  Webpack configuration */
const PORT = 8081;
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const assetPath = '/assets/';
const absolutePath = path.join(__dirname, 'build', assetPath);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const npmBase = path.join(__dirname, '../../node_modules');

class WebpackBaseConfig {

	constructor() {
		this._config = {};
	}
	/* Get the list of included packages */
	get includedPackages() {
		return [].map((pkg) => fs.realpathSync(path.join(npmBase, pkg)));
	}
	/*  Set the config data */
	set config(data) {
		this._config = Object.assign({}, this.defaultSettings, data);
		return this._config;
	}
	/*  Get the global config */
	get config() {
		return this._config;
	}
	/*  Get the environment name */
	get env() {
		return 'dev';
	}
	/* Get the absolute path to src directory */
	get srcPathAbsolute() {
		return path.resolve('./src');
	}
	/* Get the absolute path to tests directory */
	get testPathAbsolute() {
		return path.resolve('./test');
	}
	/* Get the default settings */
	get defaultSettings() {
		return {
			context: this.srcPathAbsolute,
			devtool: 'eval',
			entry: [
				'./index.js'
			],
			output: {
				path: path.resolve('./dist/assets'),
				filename: 'bundle.js',
				publicPath: './assets/'
			},
			devServer: {
				contentBase: './src',
				publicPath: '/assets/',
				historyApiFallback: true,
				hot: true,
				inline: true,
				port: 8000,
				stats:{
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
					warnings: true
				}
			},
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
					use: 'css-loader'
				}, {
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [{
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
			plugins: [],
			resolve: {
				alias: {
					ReactApp: `${this.srcPathAbsolute}/`,
					actions: `${this.srcPathAbsolute}/actionsCreator/`,
					components: `${this.srcPathAbsolute}/components/`,
					constants: `${this.srcPathAbsolute}/constants/`,
					stores: `${this.srcPathAbsolute}/reducers/`,
					routes: `${this.srcPathAbsolute}/routes/`
				},
				extensions: ['.js', '.jsx'],
				modules: [
					this.srcPathAbsolute,
					'node_modules'
				]
			}
		};
	}
}

module.exports = WebpackBaseConfig;