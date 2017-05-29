/*  Webpack configuration */
const PORT = 8081;
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const assetPath = '/assets/';
const absolutePath = path.join(__dirname, 'build', assetPath);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const npmBase = path.join(__dirname, '../node_modules');

class WebpackBaseConfig {

	constructor() {
		this._config = {};
	}
		/* Get the list of included packages */
	get includedPackages() {
		return [].map(pkg => fs.realpathSync(path.join(npmBase, pkg)));
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
		const cssModulesQuery = {
			modules: true,
			importLoaders: 1,
			localIdentName: '[name]-[local]-[hash:base64:5]'
		};
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
					warnings: true
				}
			},
			module: {
				rules: [{
					enforce: 'pre',
					test: /\.js?$/,
					include: this.srcPathAbsolute,
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react', 'stage-1']
					}
				}, {
					test: /\.(js|jsx)$/,
					include: [].concat(
						this.includedPackages, [this.srcPathAbsolute]
					)

				}, {
					test: /^.((?!cssmodule).)*\.(sass|scss)$/,
					loaders: [{
						loader: 'style-loader'
					}, {
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
					}]
				}, {
					test: /\.cssmodule\.(sass|scss)$/,
					loaders: [{
						loader: 'style-loader'
					}, {
						loader: 'css-loader',
						query: cssModulesQuery
					}, {
						loader: 'sass-loader'
					}]
				}]
			},
			plugins: [],
			resolve: {
				alias: {
					ReactApp: `${this.srcPathAbsolute}/`,
					actionCreator: `${this.srcPathAbsolute}/actionCreator/`,
					components: `${this.srcPathAbsolute}/components/`,
					constants: `${this.srcPathAbsolute}/constants/`,
					stores: `${this.srcPathAbsolute}/reducers/`,
					routes: `${this.srcPathAbsolute}/routes/`,
					utils: `${this.srcPathAbsolute}/utils/`
				},
				extensions: ['.js', '.jsx', '.scss'],
				modules: [
					this.srcPathAbsolute,
					'node_modules'
				]
			}
		};
	}
}

module.exports = WebpackBaseConfig;
